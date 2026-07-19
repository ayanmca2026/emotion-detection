import { Link } from 'react-router-dom';

const TrainingResults = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Training Results</h1>
      <div className="glass-card p-8">
        <p className="text-gray-400 mb-6">Detailed training metrics, confusion matrix, classification report, ROC curve, and Precision-Recall curves are visualized on the Dashboard.</p>
        <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
      </div>
    </div>
  );
};
export default TrainingResults;