import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { FC, ChangeEvent, useState, useRef } from 'react';
type FileInputFieldProps = FieldWrapperPassThroughProps &
  Required<Pick<FieldWrapperPassThroughProps, 'label'>> & {
    className?: string;
    disabled?: boolean;
    defaultValue?: string;
    onFileChange: (file: any) => void;
  };
export const FileInputField: FC<FileInputFieldProps> = ({
  label,
  error,
  disabled,
  onFileChange,
  defaultValue,
}) => {
  const [previewUrl, setPreviewUrl] = useState(defaultValue ?? '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (file) {
      onFileChange(file);
      e.target.value = '';

      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <FieldWrapper label={label} error={error}>
      <img
        src={previewUrl ?? '/images/default-avatar.png'}
        alt="Preview"
        onClick={handleClick}
        className="hover:opacity-50 transition-opacity duration-300"
        style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        style={{ display: 'none' }}
      />
    </FieldWrapper>
  );
};
