const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-white">About the Project</h1>
      <div className="glass-card p-8 text-gray-300 leading-relaxed space-y-6">
        <p>This project is a state-of-the-art Emotion Detection Web Application designed to classify human facial expressions into 7 core emotions using Deep Learning.</p>
        <h3 className="text-xl font-semibold text-white">Technology Stack</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Frontend:</strong> React 18, Vite, Tailwind CSS, Framer Motion</li>
          <li><strong>Backend:</strong> FastAPI, Python 3.11, Uvicorn</li>
          <li><strong>AI/ML:</strong> TensorFlow, Keras, OpenCV, ResNet50V2 Transfer Learning</li>
          <li><strong>Dataset:</strong> FER-2013</li>
        </ul>
        <h3 className="text-xl font-semibold text-white">Prediction Pipeline</h3>
        <p>Images are uploaded via the React frontend to the FastAPI backend. The backend uses OpenCV to convert the image to grayscale, resize it to 48x48 pixels, and normalize it before passing it to the ResNet50V2 model for inference.</p>
      </div>
    </div>
  );
};
export default About;