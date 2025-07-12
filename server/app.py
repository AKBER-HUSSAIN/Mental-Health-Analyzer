# server/app.py

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from auth_routes import auth
from analyze_routes import analyze
from routes.history_routes import history
load_dotenv()

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(auth)
app.register_blueprint(analyze)
app.register_blueprint(history)  

@app.route("/")
def home():
    return "🧠 Mental Health Analyzer API is running with Gemini tips."

if __name__ == "__main__":
    app.run(debug=True)
