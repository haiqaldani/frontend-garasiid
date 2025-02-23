import React, { useState } from 'react';
import axios from 'axios';

interface EditImageProps {
  id: number;
  currentTitle: string;
  image: string;
  onUpdateSuccess: () => void;
}

const EditImage: React.FC<EditImageProps> = ({ id, currentTitle, image, onUpdateSuccess }) => {
  const [title, setTitle] = useState(currentTitle);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.put(`http://localhost:5002/api/images/${id}`, {
        title: title.trim()
      });

      if (response.data.success) {
        onUpdateSuccess();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to update title');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img 
          src={image} 
          alt={currentTitle} 
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Update Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              minLength={2}
              maxLength={100}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || title.trim().length < 2}
              className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 
                ${(isSubmitting || title.trim().length < 2) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Updating...' : 'Update Title'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditImage; 