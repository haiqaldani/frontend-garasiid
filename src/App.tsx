import React from 'react';
import './index.css';
import ImageGallery from './components/ImageGallery';
import InspectionForm from './components/InspectionForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EditImagePage from './pages/EditImagePage';
import ViewImagePage from './pages/ViewImagePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditImagePage />} />
        <Route path="/view/:id" element={<ViewImagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
