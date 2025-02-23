export interface ImageField {
  id: string;
  label: string;
  file: File | null;
  imageUrl: string | null;
}

export interface FormData {
  fields: ImageField[];
} 