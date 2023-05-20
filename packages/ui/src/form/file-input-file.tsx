import { FieldWrapper, FieldWrapperPassThroughProps } from './field-wrapper';
import { FC, ChangeEvent } from 'react';
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
}) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (file) {
      onFileChange(file);
      e.target.value = '';
    }
  };

  return (
    <FieldWrapper label={label} error={error}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
      />
    </FieldWrapper>
  );
};
