import { ImageField } from '../../types/types';
import ImageFieldComponent from '../ImageField';

interface FieldsListProps {
  fields: ImageField[];
  onLabelChange: (id: string, label: string) => void;
  onImageUpload: (id: string, files: FileList) => void;
  onRemove: (id: string) => void;
  onImageRemove: (id: string) => void;
}

const FieldsList: React.FC<FieldsListProps> = ({
  fields,
  onLabelChange,
  onImageUpload,
  onRemove,
  onImageRemove,
}) => (
  <div className="space-y-4">
    {fields.map(field => (
      <ImageFieldComponent
        key={field.id}
        field={field}
        onLabelChange={onLabelChange}
        onImageUpload={onImageUpload}
        onRemove={onRemove}
        onImageRemove={onImageRemove}
      />
    ))}
  </div>
);

export default FieldsList; 