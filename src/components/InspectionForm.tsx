import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ImageField } from '../types/types';
import FieldsList from './elements/FieldsList';
import FormButtons from './elements/FormButtons';
import StatusMessage from './elements/StatusMessage';
import ImageUploadField from './elements/ImageUploadField';

interface Props {
  onUploadSuccess?: () => void;
}

const InspectionForm: React.FC<Props> = ({ onUploadSuccess }) => {
  const [fields, setFields] = useState<ImageField[]>([
    { id: uuidv4(), label: '', imageUrl: null, file: null }
  ]);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addField = () => {
    setFields([...fields, { id: uuidv4(), label: '', imageUrl: null, file: null }]);
  };

  const handleFileChange = (files: FileList | null, fieldId: string) => {
    if (!files) return;

    // Convert FileList to Array
    const fileArray = Array.from(files);
    
    setFields(currentFields => {
      const currentFieldIndex = currentFields.findIndex(f => f.id === fieldId);
      if (currentFieldIndex === -1) return currentFields;

      const newFields = [...currentFields];
      
      // Update the current field with the first file
      newFields[currentFieldIndex] = {
        ...newFields[currentFieldIndex],
        file: fileArray[0],
        imageUrl: URL.createObjectURL(fileArray[0])
      };

      // Create new fields for additional files
      const additionalFields = fileArray.slice(1).map(file => ({
        id: uuidv4(),
        label: '',
        file: file,
        imageUrl: URL.createObjectURL(file)
      }));

      // Insert new fields after the current field
      newFields.splice(currentFieldIndex + 1, 0, ...additionalFields);

      return newFields;
    });
  };

  const handleRemoveField = (id: string) => {
    if (fields.length > 1) {
      setFields(fields.filter(field => field.id !== id));
    }
  };

  const handleImageRemove = (id: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, imageUrl: null, file: null, label: '' } : field
    ));
  };

  const handleLabelChange = (value: string, fieldId: string) => {
    setFields(currentFields =>
      currentFields.map(field =>
        field.id === fieldId ? { ...field, label: value } : field
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const validFields = fields.filter(field => field.file && field.label);
      
      if (validFields.length === 0) {
        throw new Error('Please add at least one image with a title');
      }

      // Check file size before upload (5MB limit)
      const tooLargeFile = validFields.find(field => field.file && field.file.size > 5 * 1024 * 1024);
      if (tooLargeFile) {
        throw new Error('File size cannot exceed 5MB');
      }

      const data = new FormData();

      // For single file, duplicate the entry to match server expectation
      if (validFields.length === 1) {
        const field = validFields[0];
        data.append('titles', field.label.trim());
        data.append('titles', field.label.trim());
        data.append('files', field.file!);
        data.append('files', field.file!);
      } else {
        validFields.forEach(field => {
          data.append('titles', field.label.trim());
        });
        validFields.forEach(field => {
          data.append('files', field.file!);
        });
      }

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5002/api/images/upload',
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        data: data
      };

      const response = await axios.request(config);
      console.log('Upload successful:', response.data);
      setSubmitStatus('Images uploaded successfully!');
      setFields([{ id: uuidv4(), label: '', imageUrl: null, file: null }]);

      // Refresh the page after successful upload
      window.location.reload();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Extract error message from response
        const errorResponse = error.response?.data;
        const errorMessage = errorResponse?.message || errorResponse?.error || error.message;
        console.error('Upload error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: errorMessage
        });
        setSubmitStatus(`Error: ${errorMessage}`);
      } else if (error instanceof Error) {
        setSubmitStatus(`Error: ${error.message}`);
      } else {
        setSubmitStatus('Error: Something went wrong!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <ImageUploadField
          fields={fields}
          onLabelChange={handleLabelChange}
          onImageUpload={handleFileChange}
          onRemove={handleRemoveField}
          onImageRemove={handleImageRemove}
        />
        
        <FormButtons
          onAddField={addField}
          isSubmitting={isSubmitting}
        />
        
        <StatusMessage status={submitStatus} />
      </form>
    </div>
  );
};

export default InspectionForm; 