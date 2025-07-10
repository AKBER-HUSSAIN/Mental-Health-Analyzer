from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import DistilBertForSequenceClassification, DistilBertTokenizerFast
import json, ast, os
from dotenv import load_dotenv
import google.generativeai as genai
import requests

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load BERT model and tokenizer
model_path = os.path.join("model", "bert")
model = DistilBertForSequenceClassification.from_pretrained(model_path)
tokenizer = DistilBertTokenizerFast.from_pretrained(model_path)
model.eval()

# Load label map
with open(os.path.join("model", "label_map.txt"), "r") as f:
    label_map = ast.literal_eval(f.read())
reverse_label_map = {v: k for k, v in label_map.items()}



def generate_tip_gemini(user_input, emotion):
    API_KEY = os.getenv("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

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
            print("🔴 Gemini API Error:", response.text)
            return "Sorry, I couldn't generate a tip at the moment."
    except Exception as e:
        print("🔴 Gemini API Exception:", e)
        return "Sorry, I couldn't generate a tip at the moment."


@app.route("/")
def home():
    return "🧠 Mental Health Analyzer API is running with Gemini tips."


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    user_input = data.get("text", "")

    if not user_input.strip():
        return jsonify({"error": "Empty input!"}), 400

    # BERT prediction
    inputs = tokenizer(user_input, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        pred_index = torch.argmax(outputs.logits, dim=1).item()
    emotion = reverse_label_map.get(pred_index, "neutral")

    # Generate Gemini tip
    tip = generate_tip_gemini(user_input, emotion)

    return jsonify({
        "emotion": emotion,
        "tip": tip
    })


if __name__ == "__main__":
    app.run(debug=True)
