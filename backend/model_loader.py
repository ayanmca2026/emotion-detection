import os
from utils import setup_logging

logger = setup_logging()

def load_emotion_model(model_path):
    """
    Load the TensorFlow/Keras model.
    Returns None if the model file does not exist (acts as a dummy fallback).
    """
    if not os.path.exists(model_path):
        logger.warning(f"Model file not found at {model_path}. Running in dummy mode.")
        return None
    
    try:
        from tensorflow.keras.models import load_model
        model = load_model(model_path)
        logger.info(f"Successfully loaded model from {model_path}")
        return model
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        return None