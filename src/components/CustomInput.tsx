interface CustomInputProps {
  label: string;
  value: string;
  name: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  name,
  onChange,
  error,
}) => {
  return (
    <div className="custom-input">
      <label>{label}</label>
      <input type="text" value={value} name={name} onChange={onChange} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CustomInput;
