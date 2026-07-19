import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import EmotionDetection from './pages/EmotionDetection';
import Dashboard from './pages/Dashboard';
import ModelComparison from './pages/ModelComparison';
import TrainingResults from './pages/TrainingResults';
import DatasetInfo from './pages/DatasetInfo';
import ApiDocs from './pages/ApiDocs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="detect" element={<EmotionDetection />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="models" element={<ModelComparison />} />
        <Route path="training" element={<TrainingResults />} />
        <Route path="dataset" element={<DatasetInfo />} />
        <Route path="api-docs" element={<ApiDocs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;