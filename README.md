# Emotion Detection using CNN and FER-2013 Dataset

A production-ready, full-stack AI web application capable of detecting human facial emotions from uploaded images using Deep Learning. 

## Features
- **Real-time Prediction**: Fast inference times (< 1s) using FastAPI and TensorFlow.
- **Modern UI**: React 18 with Vite, Tailwind CSS, and Framer Motion for a stunning glassmorphism design.
- **Comprehensive Dashboard**: Real-time charts for training loss, accuracy, and confidence scores (powered by Recharts).
- **Model Support**: ResNet50V2 Transfer Learning architecture natively integrated.
- **Production Ready**: Decoupled frontend/backend with proper CORS, logging, error handling, and deployment configurations.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Recharts, Framer Motion
- **Backend**: Python 3.11, FastAPI, TensorFlow/Keras, OpenCV, Uvicorn
- **Dataset**: FER-2013 (7 emotion classes: Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral)

## Project Structure
- `/frontend`: The React application
- `/backend`: The FastAPI application and TensorFlow inference logic

## Deployment
- **Frontend**: Ready for deployment on Vercel. Vercel automatically detects the Vite framework. `vercel.json` is provided for rewrite rules.
- **Backend**: Ready for deployment on Render using the provided `render.yaml` and `Procfile`.

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install requirements: `pip install -r requirements.txt`
3. Add your trained model `.keras` file to `backend/saved_models/emotion_model.keras`. (If omitted, the app will run in dummy mode).
4. Run the server: `uvicorn app:app --reload`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Configure your environment: Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend URL.
4. Run the development server: `npm run dev`

## License
MIT License