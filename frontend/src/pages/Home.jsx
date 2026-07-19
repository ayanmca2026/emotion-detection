import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Camera, Activity, Shield, Zap, Layers } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="glass-card p-6 flex flex-col items-center text-center group"
  >
    <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-7 h-7 text-primary-400" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary-500/30 text-primary-400 text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          FER-2013 Model Active
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Real-time <span className="text-gradient">Emotion Detection</span><br />
          powered by Deep Learning
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10"
        >
          Upload an image and let our ResNet50V2 model analyze facial expressions to detect 7 distinct human emotions with high accuracy.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link to="/detect" className="btn-primary flex items-center justify-center gap-2 text-lg">
            <Camera className="w-5 h-5" />
            Try Prediction Now
          </Link>
          <Link to="/models" className="btn-secondary flex items-center justify-center gap-2 text-lg">
            <Brain className="w-5 h-5" />
            Explore Models
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10 bg-dark-200/50 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">State-of-the-art Architecture</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Built with modern technologies for maximum performance, accuracy, and user experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Brain} 
              title="ResNet50V2 Backbone" 
              description="Utilizes transfer learning on a robust deep residual network for superior feature extraction from facial images."
              delay={0.1}
            />
            <FeatureCard 
              icon={Zap} 
              title="FastAPI Backend" 
              description="High-performance asynchronous backend ensuring inference times of less than 1 second per image."
              delay={0.2}
            />
            <FeatureCard 
              icon={Layers} 
              title="React + Vite" 
              description="Lightning-fast frontend built with React 18, tailored with Tailwind CSS and Framer Motion for glassmorphism."
              delay={0.3}
            />
            <FeatureCard 
              icon={Activity} 
              title="Real-time Metrics" 
              description="Monitor confidence scores, training loss, and validation accuracy directly on the dashboard."
              delay={0.4}
            />
            <FeatureCard 
              icon={Camera} 
              title="Robust Preprocessing" 
              description="Automatic grayscale conversion, 48x48 resizing, and pixel normalization via OpenCV."
              delay={0.5}
            />
            <FeatureCard 
              icon={Shield} 
              title="Production Ready" 
              description="Fully decoupled architecture deployed on Vercel and Render with secure CORS configurations."
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* Performance Overview */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Performance at a glance</h2>
            <ul className="space-y-4">
              {[
                { label: 'Dataset', value: 'FER-2013' },
                { label: 'Architecture', value: 'CNN + ResNet50V2' },
                { label: 'Accuracy', value: '66%' },
                { label: 'Emotion Classes', value: '7' },
                { label: 'Inference Time', value: '< 1 second' },
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="font-semibold text-white">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-64 h-64 rounded-full border-[8px] border-dark-100 flex items-center justify-center relative shadow-[0_0_50px_rgba(14,165,233,0.2)]">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="transparent" stroke="rgba(14,165,233,0.2)" strokeWidth="8" />
                <circle cx="50" cy="50" r="46" fill="transparent" stroke="#0ea5e9" strokeWidth="8" strokeDasharray="289" strokeDashoffset="98.26" className="transition-all duration-1000" />
              </svg>
              <div className="text-center">
                <span className="text-5xl font-bold text-white block">66%</span>
                <span className="text-sm text-primary-400 uppercase tracking-widest mt-1 block">Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;