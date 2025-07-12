# server/auth_routes.py

from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import os, datetime
from dotenv import load_dotenv
from utils.jwt_utils import generate_token
load_dotenv()

auth = Blueprint("auth", __name__)
bcrypt = Bcrypt()

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["mental_health_analyzer"]
users = db["users"]

@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if users.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    users.insert_one({
        "username": username,
        "email": email,
        "password": hashed_pw,
        "created_at": datetime.datetime.utcnow()
    })

    return jsonify({"message": "User registered successfully"}), 201

# Placeholder for login
@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Incorrect password"}), 401

    token = generate_token(email)

    return jsonify({
        "message": "Login successful",
        "token": token,
        "username": user["username"],
        "email": user["email"],
        "token": token
    })
