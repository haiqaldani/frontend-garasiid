import React, { useState } from 'react';
import InspectionForm from '../components/InspectionForm';
import ImageGallery from '../components/ImageGallery';

const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <InspectionForm onUploadSuccess={handleUploadSuccess} />
      <ImageGallery key={refreshKey} />
    </div>
  );
};

export default Home; 