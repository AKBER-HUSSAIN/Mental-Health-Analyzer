from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# Use the full MongoDB URI you set in .env
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["mental_health_analyzer"]
