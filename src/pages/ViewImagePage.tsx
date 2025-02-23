import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ViewImage from '../components/ViewImage';

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

const ViewImagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!image) return <div className="text-center p-4">Loading...</div>;

  return (
    <ViewImage
      id={image.id}
      title={image.title}
      image={image.image}
      createdAt={image.createdAt}
    />
  );
};

export default ViewImagePage; 