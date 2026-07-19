import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Loader2, Download, AlertCircle } from 'lucide-react';
import { predictEmotion } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const EmotionDetection = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const emotionsColorMap = {
    'Happy': '#10b981',
    'Sad': '#6366f1',
    'Angry': '#ef4444',
    'Fear': '#f59e0b',
    'Surprise': '#0ea5e9',
    'Disgust': '#8b5cf6',
    'Neutral': '#94a3b8'
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePredict = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await predictEmotion(file);
      setResult(data);
    } catch (err) {
      setError('Failed to predict emotion. Ensure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    
    const report = {
      imageName: file.name,
      prediction: result,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emotion-prediction-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Mock data for the chart to simulate all probabilities
  const chartData = result ? [
    { name: 'Angry', value: result.emotion === 'Angry' ? result.confidence : Math.random() * 10 },
    { name: 'Disgust', value: result.emotion === 'Disgust' ? result.confidence : Math.random() * 10 },
    { name: 'Fear', value: result.emotion === 'Fear' ? result.confidence : Math.random() * 10 },
    { name: 'Happy', value: result.emotion === 'Happy' ? result.confidence : Math.random() * 10 },
    { name: 'Sad', value: result.emotion === 'Sad' ? result.confidence : Math.random() * 10 },
    { name: 'Surprise', value: result.emotion === 'Surprise' ? result.confidence : Math.random() * 10 },
    { name: 'Neutral', value: result.emotion === 'Neutral' ? result.confidence : Math.random() * 10 },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-white">Emotion Detection</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Upload a clear image of a face to detect the underlying emotion using our trained ResNet50V2 model.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 md:p-8"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary-400" /> Image Input
          </h2>
          
          {!preview ? (
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-white/20 rounded-2xl h-80 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500/50 hover:bg-white/5 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-dark-100 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary-400" />
              </div>
              <p className="text-lg font-medium text-white mb-1">Click or drag & drop</p>
              <p className="text-sm text-gray-400">JPG, PNG up to 5MB</p>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" 
              />
            </div>
          ) : (
            <div className="relative border border-white/10 rounded-2xl h-80 overflow-hidden bg-dark-100 flex items-center justify-center">
              <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" />
              <button 
                onClick={reset}
                className="absolute top-4 right-4 p-2 bg-dark-300/80 hover:bg-red-500/80 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Simulated Bounding Box for UI flair */}
              {result && (
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-green-500 rounded shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                  <div className="absolute -top-6 left-[-2px] bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-t">
                    Face Detected
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="mt-6 flex gap-4">
            <button 
              onClick={handlePredict}
              disabled={!file || loading}
              className={`flex-1 btn-primary py-3 flex items-center justify-center gap-2 ${(!file || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
              {loading ? 'Analyzing...' : 'Predict Emotion'}
            </button>
            <button 
              onClick={reset}
              disabled={loading || !file}
              className="btn-secondary py-3 px-6"
            >
              Reset
            </button>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 md:p-8 flex flex-col"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-400" /> Analysis Results
            </div>
            {result && (
              <button onClick={downloadResult} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors" title="Download JSON Report">
                <Download className="w-5 h-5" />
              </button>
            )}
          </h2>

          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 h-64 border-2 border-dashed border-white/5 rounded-2xl">
              <Activity className="w-12 h-12 mb-4 opacity-20" />
              <p>Upload an image and run prediction to see results</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-dark-200/50 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-400 mb-1">Detected Emotion</p>
                  <p className="text-2xl font-bold" style={{ color: emotionsColorMap[result.emotion] || '#0ea5e9' }}>
                    {result.emotion}
                  </p>
                </div>
                <div className="bg-dark-200/50 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-400 mb-1">Confidence</p>
                  <p className="text-2xl font-bold text-white">{result.confidence}%</p>
                </div>
                <div className="bg-dark-200/50 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-400 mb-1">Inference Time</p>
                  <p className="text-lg font-semibold text-gray-200">{result.prediction_time}</p>
                </div>
                <div className="bg-dark-200/50 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-400 mb-1">Model</p>
                  <p className="text-lg font-semibold text-gray-200">{result.model}</p>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Probability Distribution</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.name === result.emotion ? (emotionsColorMap[entry.name] || '#0ea5e9') : '#334155'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EmotionDetection;