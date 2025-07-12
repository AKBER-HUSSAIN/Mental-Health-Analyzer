from functools import wraps
from flask import request, jsonify
from utils.jwt_utils import verify_token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Token from header
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].replace("Bearer ", "")

        if not token:
            return jsonify({"error": "Token is missing!"}), 401

        email = verify_token(token)
        if not email:
            return jsonify({"error": "Invalid or expired token!"}), 401

        return f(email, *args, **kwargs)

    return decorated
