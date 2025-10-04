from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load model
model = joblib.load("lightgbm_model.pkl")

@app.get("/")
def home():
    return "API is working"

@app.post("/predict")
def predict():
    data = request.get_json()
    df = pd.DataFrame(data)
    preds = model.predict(df)
    return jsonify(preds.tolist())
