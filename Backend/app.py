# backend/app.py
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()

# Load model
model = joblib.load("model/lightxgb_model.pkl")

# Input schema
class LocationData(BaseModel):
    latitude: float
    longitude: float
    NO2_ugm3: float
    O3_ugm3: float
    HCHO_ugm3: float
    hour: int
    dayofweek: int
    month: int

@app.post("/predict")
def predict(data: list[LocationData]):
    df = pd.DataFrame([d.dict() for d in data])
    # Add any preprocessing here if needed
    preds = model.predict(df)
    return {"predictions": preds.tolist()}
