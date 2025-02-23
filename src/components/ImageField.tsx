import React from 'react';
import { ImageField } from '../types/types';

interface Props {
  field: ImageField;
  onLabelChange: (id: string, label: string) => void;
  onImageUpload: (id: string, files: FileList) => void;
  onRemove: (id: string) => void;
  onImageRemove: (id: string) => void;
}

const ImageFieldComponent: React.FC<Props> = ({
  field,
  onLabelChange,
  onImageUpload,
  onRemove,
  onImageRemove,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(field.id, files);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={field.label}
          onChange={(e) => onLabelChange(field.id, e.target.value)}
          placeholder="Enter image label"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={() => onRemove(field.id)}
          className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
          type="button"
          aria-label="Remove field"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="relative">
        {field.imageUrl ? (
          <div className="flex flex-col items-center gap-4">
            <img 
              src={field.imageUrl} 
              alt={field.label} 
              className="max-h-[300px] object-contain rounded-lg"
            />
            <button 
              onClick={() => onImageRemove(field.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              type="button"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              multiple
            />
            <div className="text-center">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor" 
                fill="none" 
                viewBox="0 0 48 48"
              >
                <path 
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageFieldComponent; 