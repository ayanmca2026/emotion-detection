const DatasetInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-white">FER-2013 Dataset Information</h1>
      <div className="glass-card p-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Overview</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          The FER-2013 dataset consists of 35,887 grayscale, 48x48 sized face images with 7 emotions: Angry, Disgust, Fear, Happy, Sad, Surprise, and Neutral.
        </p>
        
        <h2 className="text-xl font-semibold mb-4 text-white mt-8">Class Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Happy', count: 8989 },
            { label: 'Neutral', count: 6198 },
            { label: 'Sad', count: 6077 },
            { label: 'Fear', count: 5121 },
            { label: 'Angry', count: 4953 },
            { label: 'Surprise', count: 3171 },
            { label: 'Disgust', count: 547 },
          ].map(c => (
            <div key={c.label} className="bg-dark-200/50 p-4 rounded-xl border border-white/5 text-center">
              <div className="text-sm text-gray-400 mb-1">{c.label}</div>
              <div className="text-xl font-bold text-primary-400">{c.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DatasetInfo;