import numpy as np
from preprocess import preprocess_image

EMOTION_CLASSES = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

def predict_emotion(image_bytes, model):
    """
    Predict emotion from image bytes.
    If model is None (dummy), return a random prediction for demonstration.
    """
    if model is None:
        # Dummy prediction fallback
        import random
        emotion_idx = random.randint(0, 6)
        confidence = round(random.uniform(70.0, 99.9), 2)
        return {
            "emotion": EMOTION_CLASSES[emotion_idx],
            "confidence": confidence,
            "model": "ResNet50V2 (Dummy)"
        }
        
    try:
        processed_image = preprocess_image(image_bytes)
        
        # Predict using the TensorFlow model
        predictions = model.predict(processed_image)
        emotion_idx = np.argmax(predictions[0])
        confidence = float(np.max(predictions[0])) * 100
        
        return {
            "emotion": EMOTION_CLASSES[emotion_idx],
            "confidence": round(confidence, 2),
            "model": "ResNet50V2"
        }
    except Exception as e:
        raise RuntimeError(f"Error in prediction: {str(e)}")