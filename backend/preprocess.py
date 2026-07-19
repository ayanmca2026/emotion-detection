import cv2
import numpy as np

def preprocess_image(image_bytes):
    """
    Preprocess image bytes for the CNN model.
    1. Decode image bytes
    2. Convert to grayscale (if model expects grayscale) or keep RGB
    3. Resize to 48x48
    4. Normalize pixel values
    5. Expand dimensions to match model input shape (1, 48, 48, 1) or (1, 48, 48, 3)
    """
    # Convert bytes to numpy array
    nparr = np.frombuffer(image_bytes, np.uint8)
    
    # Decode image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Invalid image file")
    
    # Convert to grayscale (FER-2013 is usually grayscale 48x48)
    # If using ResNet50V2, it might expect 3 channels. We'll convert to grayscale, 
    # then replicate to 3 channels if needed, but let's stick to standard 1 channel for now.
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Resize to 48x48
    resized = cv2.resize(gray, (48, 48))
    
    # Normalize pixels [0, 1]
    normalized = resized / 255.0
    
    # Expand dims (1, 48, 48, 1)
    reshaped = np.reshape(normalized, (1, 48, 48, 1))
    
    return reshaped