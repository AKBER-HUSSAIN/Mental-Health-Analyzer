from flask import Blueprint, request, jsonify
import torch
from transformers import DistilBertForSequenceClassification, DistilBertTokenizerFast
import ast, os, requests, datetime
from dotenv import load_dotenv
from db import db  # 🆕 import your MongoDB connection

analyze = Blueprint("analyze", __name__)

load_dotenv()

# Load model
model_path = os.path.join("model", "bert")
model = DistilBertForSequenceClassification.from_pretrained(model_path)
tokenizer = DistilBertTokenizerFast.from_pretrained(model_path)
model.eval()

# Load label map
with open(os.path.join("model", "label_map.txt"), "r") as f:
    label_map = ast.literal_eval(f.read())
reverse_label_map = {v: k for k, v in label_map.items()}


# Gemini tip generation
def generate_tip_gemini(user_input, emotion):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={os.getenv('GEMINI_API_KEY')}"
    prompt = f"""
You are a kind mental health assistant.

The user said: "{user_input}"
Detected emotion: "{emotion}"

Generate a short, compassionate wellness tip or supportive message.
Keep it simple and encouraging.
"""
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ]
    }

    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            return response.json()["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return "Sorry, I couldn't generate a tip right now."
    except Exception as e:
        return "Sorry, something went wrong."


@analyze.route("/analyze", methods=["POST"])
def analyze_text():
    data = request.json
    user_input = data.get("text", "")
    user_email = data.get("email", "")  # 🆕 get email to track history

    if not user_input.strip():
        return jsonify({"error": "Empty input!"}), 400

    if not user_email.strip():
        return jsonify({"error": "Email required!"}), 400

    # Predict emotion using BERT
    inputs = tokenizer(user_input, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        pred_index = torch.argmax(outputs.logits, dim=1).item()
    emotion = reverse_label_map.get(pred_index, "neutral")

    # Generate Gemini tip
    tip = generate_tip_gemini(user_input, emotion)

    # 🆕 Save analysis to MongoDB
    db["history"].insert_one({
        "email": user_email,
        "text": user_input,
        "emotion": emotion,
        "tip": tip,
        "timestamp": datetime.datetime.utcnow()
    })

    return jsonify({
        "emotion": emotion,
        "tip": tip
    })
