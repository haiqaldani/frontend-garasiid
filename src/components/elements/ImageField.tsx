import React from 'react';
import { ImageField } from '../../types/types';

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
        >
          Remove
        </button>
      </div>
      
      <div className="relative">
        {field.imageUrl ? (
          <div className="flex flex-col items-center gap-4">
            <img 
              src={field.imageUrl} 
              alt={field.label} 
              className="max-h-[200px] object-contain rounded-lg"
            />
            <button 
              onClick={() => onImageRemove(field.id)}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
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
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageFieldComponent; 