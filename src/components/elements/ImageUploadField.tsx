import React, { useCallback } from 'react';
import { ImageField } from '../../types/types';

interface ImageUploadFieldProps {
  fields: ImageField[];
  onLabelChange: (value: string, id: string) => void;
  onImageUpload: (files: FileList | null, id: string) => void;
  onRemove: (id: string) => void;
  onImageRemove: (id: string) => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  fields,
  onLabelChange,
  onImageUpload,
  onRemove,
  onImageRemove
}) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, fieldId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      onImageUpload(droppedFiles, fieldId);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.id} className="border rounded-lg p-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={field.label}
                onChange={(e) => onLabelChange(e.target.value, field.id)}
                placeholder="Enter image title"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex space-x-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onImageUpload(e.target.files, field.id)}
                className="hidden"
                id={`file-${field.id}`}
              />
              <label
                htmlFor={`file-${field.id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
              >
                Upload Image
              </label>
              <button
                onClick={() => onRemove(field.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
          
          <div 
            className={`mt-4 relative ${!field.imageUrl ? 'border-2 border-dashed border-gray-300 rounded-lg p-8' : ''}`}
            onDrop={(e) => handleDrop(e, field.id)}
            onDragOver={handleDragOver}
          >
            {field.imageUrl ? (
              <>
                <img
                  src={field.imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded"
                />
                <button
                  onClick={() => onImageRemove(field.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </>
            ) : (
              <div className="text-center">
                <p className="text-gray-500">
                  Drag and drop your image here, or click Upload Image
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageUploadField; 