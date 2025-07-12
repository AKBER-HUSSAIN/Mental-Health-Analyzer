from flask import Blueprint, request, jsonify
from db import db

history = Blueprint("history", __name__)

@history.route("/history", methods=["POST"])
def get_history():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Find mood entries by user email
    mood_entries = list(db.history.find({"email": email}, {"_id": 0}))
    
    return jsonify({"history": mood_entries})
