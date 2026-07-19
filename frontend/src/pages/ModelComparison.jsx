import { motion } from 'framer-motion';

const ModelComparison = () => {
  const models = [
    { name: 'Custom CNN', acc: '62.4%', valAcc: '58.2%', inference: '0.02s', params: '2.5M' },
    { name: 'VGG16', acc: '68.1%', valAcc: '64.5%', inference: '0.12s', params: '138M' },
    { name: 'ResNet50V2', acc: '72.3%', valAcc: '66.8%', inference: '0.08s', params: '23M' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Model Comparison</h1>
      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-dark-200/80 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-gray-300">Architecture</th>
              <th className="p-4 font-semibold text-gray-300">Accuracy</th>
              <th className="p-4 font-semibold text-gray-300">Val Accuracy</th>
              <th className="p-4 font-semibold text-gray-300">Inference Time</th>
              <th className="p-4 font-semibold text-gray-300">Parameters</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {models.map((m, idx) => (
              <motion.tr 
                key={m.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="p-4 font-medium text-white">{m.name}</td>
                <td className="p-4 text-gray-400">{m.acc}</td>
                <td className="p-4 text-gray-400">{m.valAcc}</td>
                <td className="p-4 text-gray-400">{m.inference}</td>
                <td className="p-4 text-gray-400">{m.params}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ModelComparison;