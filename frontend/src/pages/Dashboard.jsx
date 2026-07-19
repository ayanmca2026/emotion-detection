import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useEffect, useState } from 'react';
import { getMetrics } from '../services/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getMetrics();
        // Format data for charts
        const formattedData = data.training_accuracy.map((val, idx) => ({
          epoch: idx + 1,
          train_acc: val * 100,
          val_acc: data.validation_accuracy[idx] * 100,
          train_loss: data.training_loss[idx],
          val_loss: data.validation_loss[idx]
        }));
        setMetrics(formattedData);
      } catch (error) {
        console.error("Failed to fetch metrics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-white">System Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Predictions', value: '1,248' },
          { label: 'Avg Inference Time', value: '0.45s' },
          { label: 'Uptime', value: '99.9%' },
          { label: 'API Status', value: 'Healthy', color: 'text-green-400' }
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6"
          >
            <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-6">Model Accuracy Overview</h2>
          <div className="h-72">
            {!loading && metrics ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics}>
                  <defs>
                    <linearGradient id="colorTrain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="epoch" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Area type="monotone" dataKey="train_acc" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorTrain)" name="Train Accuracy (%)" />
                  <Area type="monotone" dataKey="val_acc" stroke="#10b981" fill="transparent" name="Val Accuracy (%)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">Loading metrics...</div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-6">Loss History</h2>
          <div className="h-72">
            {!loading && metrics ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="epoch" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="train_loss" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Train Loss" />
                  <Line type="monotone" dataKey="val_loss" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Val Loss" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">Loading metrics...</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;