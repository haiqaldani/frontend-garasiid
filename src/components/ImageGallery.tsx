import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Image {
  id: number;
  title: string;
  image: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: Image[];
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get<ApiResponse>('http://localhost:5002/api/images');
      if (response.data.success) {
        setImages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load images');
    }
  };

  const handleDeleteImage = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:5002/api/images/${id}`);
      if (response.data.success) {
        setImages(images.filter(image => image.id !== id));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleUpdateTitle = async (id: number, newTitle: string) => {
    try {
      const response = await axios.put(`http://localhost:5002/api/images/${id}`, { title: newTitle });
      if (response.data.success) {
        setImages(images.map(image => 
          image.id === id ? { ...image, title: newTitle } : image
        ));
      }
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map(image => (
        <div key={image.id} className="border rounded-lg p-4 shadow">
          <img 
            src={image.image} 
            alt={image.title} 
            className="w-full h-48 object-cover rounded-lg mb-2 cursor-pointer"
            onClick={() => window.location.href = `/view/${image.id}`}
          />
          <div className="space-y-2">
            <h3 className="font-semibold">{image.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(image.createdAt).toLocaleDateString()}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => window.location.href = `/view/${image.id}`}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                View
              </button>
              <button
                onClick={() => window.location.href = `/edit/${image.id}`}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteImage(image.id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {error && (
        <div className="text-red-500 text-center col-span-full">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageGallery; 