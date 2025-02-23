import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditImage from '../components/EditImage';

interface ImageData {
  id: number;
  title: string;
  image: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: ImageData;
}

const EditImagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [image, setImage] = useState<ImageData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://localhost:5002/api/images/${id}`,
          headers: { }
        };

        const response = await axios.request<ApiResponse>(config);
        console.log('Fetched image:', response.data);
        
        if (response.data.success) {
          setImage(response.data.data);
        } else {
          setError('Failed to fetch image data');
        }
      } catch (error) {
        setError('Failed to fetch image');
        console.error('Error fetching image:', error);
      }
    };

    if (id) {
      fetchImage();
    }
  }, [id]);

  const handleUpdateSuccess = () => {
    navigate('/');
  };

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!image) return <div className="text-center p-4">Loading...</div>;

  return (
    <EditImage
      id={image.id}
      currentTitle={image.title}
      image={image.image}
      onUpdateSuccess={handleUpdateSuccess}
    />
  );
};

export default EditImagePage; 