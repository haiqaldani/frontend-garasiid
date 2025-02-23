interface FormButtonsProps {
  onAddField: () => void;
  isSubmitting: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ onAddField, isSubmitting }) => {
  return (
    <div className="mt-4 flex justify-between">
      <button
        type="button"
        onClick={onAddField}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Field
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 
          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Uploading...' : 'Upload Images'}
      </button>
    </div>
  );
};

export default FormButtons; 