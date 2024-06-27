import React, { useState } from "react";
import Select from "./Select";
import "./Form.scss";

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="custom-input">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<any>([1, 2]);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedOptionsError, setSelectedOptionsError] = useState<
    string | null
  >(null);

  const isMultipleSelect: boolean = true;

  const options = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
    { label: "Option 4", value: 4 },
  ];

  const handleSelect = (selected: any) => {
    setSelectedOptions(selected);
    alert(`Selected: ${JSON.stringify(selected)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || name.length > 20) {
      setNameError("Name is required and must be less than 20 characters");
      return;
    } else {
      setNameError(null);
    }

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError(null);
    }

    if (!selectedOptions || !selectedOptions?.length) {
      setSelectedOptionsError(
        isMultipleSelect
          ? "Please select at list one option"
          : "Please select one option"
      );
      return;
    } else {
      setSelectedOptionsError(null);
    }

    console.log({ name, email, selectedOptions });
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        label="Name"
        value={name}
        onChange={(value) => {
          setName(value);
          if (value.length > 20) {
            setNameError("Name must be less than 20 characters");
          } else {
            setNameError(null);
          }
        }}
        error={nameError}
      />
      <CustomInput
        label="Email"
        value={email}
        onChange={(value) => setEmail(value)}
        error={emailError}
      />
      <div className="select-wrapper">
        <Select
          options={options}
          isMultiple={isMultipleSelect}
          placeholder="Select options"
          onSelect={handleSelect}
          initialValue={selectedOptions}
        />
        {selectedOptionsError && (
          <p className="error">{selectedOptionsError}</p>
        )}
      </div>

      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
