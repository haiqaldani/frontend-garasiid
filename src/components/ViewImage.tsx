import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ViewImageProps {
  id: number;
  title: string;
  image: string;
  createdAt: string;
}

const ViewImage: React.FC<ViewImageProps> = ({ id, title, image, createdAt }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-[500px] object-contain bg-black"
          />
        </div>
        
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          
          <p className="text-sm text-gray-500">
            Uploaded on: {new Date(createdAt).toLocaleDateString()}
          </p>

          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImage; 