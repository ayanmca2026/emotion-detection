const ApiDocs = () => (
  <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold mb-8 text-white">API Documentation</h1>
    <div className="glass-card p-8 space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-primary-400 mb-2">POST /predict</h3>
        <p className="text-gray-400 mb-4">Uploads an image for emotion prediction.</p>
        <div className="bg-dark-100 p-4 rounded-xl font-mono text-sm text-gray-300">
          <p>Body: multipart/form-data</p>
          <p>Key: 'file' (Image file)</p>
          <p className="mt-4 text-gray-500">// Response</p>
          <p>{`{`}</p>
          <p className="pl-4">{`"emotion": "Happy",`}</p>
          <p className="pl-4">{`"confidence": 95.64,`}</p>
          <p className="pl-4">{`"prediction_time": "0.08 sec",`}</p>
          <p className="pl-4">{`"model": "ResNet50V2"`}</p>
          <p>{`}`}</p>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-primary-400 mb-2">GET /health</h3>
        <p className="text-gray-400">Returns API health status.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-primary-400 mb-2">GET /metrics</h3>
        <p className="text-gray-400">Returns training and validation metrics for dashboard charts.</p>
      </div>
    </div>
  </div>
);
export default ApiDocs;