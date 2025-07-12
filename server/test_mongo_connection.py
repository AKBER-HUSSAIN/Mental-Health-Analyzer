# test_mongo_connection.py

from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load the environment variables from .env file
load_dotenv()

# Get the MongoDB URI from .env
mongo_uri = os.getenv("MONGO_URI")

try:
    # Connect to MongoDB
    client = MongoClient(mongo_uri)
    db = client["mental_health_analyzer"]  # Use your actual DB name

    # Attempt to list collections (will trigger connection)
    collections = db.list_collection_names()
    print("✅ MongoDB connected successfully!")
    print("📂 Collections in database:", collections)

except Exception as e:
    print("❌ MongoDB connection failed:")
    print(str(e))
