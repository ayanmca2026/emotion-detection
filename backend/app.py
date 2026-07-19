from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import os

from predict import predict_emotion
from model_loader import load_emotion_model
from utils import setup_logging

logger = setup_logging()

app = FastAPI(
    title="Emotion Detection API",
    description="API for detecting emotions from human faces using CNN",
    version="1.0.0"
)

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model globally on startup
model = None

@app.on_event("startup")
async def startup_event():
    global model
    logger.info("Loading model on startup...")
    model = load_emotion_model("saved_models/emotion_model.keras")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Emotion Detection API"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

@app.get("/model")
def model_info():
    return {
        "model_name": "ResNet50V2_Transfer_Learning",
        "dataset": "FER-2013",
        "accuracy": "66%",
        "emotion_classes": 7
    }

@app.get("/metrics")
def get_metrics():
    # Return dummy metrics for the charts
    return {
        "training_accuracy": [0.3, 0.45, 0.55, 0.62, 0.66],
        "validation_accuracy": [0.28, 0.42, 0.53, 0.60, 0.64],
        "training_loss": [1.8, 1.5, 1.2, 0.9, 0.8],
        "validation_loss": [1.85, 1.6, 1.3, 1.0, 0.85]
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    start_time = time.time()
    
    try:
        contents = await file.read()
        result = predict_emotion(contents, model)
        
        prediction_time = time.time() - start_time
        result["prediction_time"] = f"{prediction_time:.2f} sec"
        
        return result
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error during prediction")