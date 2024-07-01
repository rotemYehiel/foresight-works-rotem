import React, { useState } from "react";
import Select from "./Select";

interface Option {
  label: string;
  value: number;
}
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
    <div>
      <label>{label}</label>
      <input type="text" value={value} name={name} onChange={onChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<number[] | null>([
    1, 2,
  ]);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedOptionsError, setSelectedOptionsError] = useState<
    string | null
  >(null);

  const isMultipleSelect: boolean = true;

  const options: Option[] = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
    { label: "Option 4", value: 4 },
  ];

  const handleSelect = (selected: any) => {
    setSelectedOptions(selected);
    alert(`Selected: ${JSON.stringify(selected)}`);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (
      (!isMultipleSelect && !selectedOptions) ||
      (isMultipleSelect && !selectedOptions?.length)
    ) {
      setSelectedOptionsError(
        isMultipleSelect
          ? "Please select at list one option"
          : "Please select one option"
      );

      return;
    } else {
      setSelectedOptionsError(null);
    }

    if (!name || nameError || !email || emailError) {
      return;
    }

    console.log("submit", { name, email, selectedOptions });
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handelOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    switch (name) {
      case "name":
        setName(value);
        value.length > 20
          ? setNameError("Name must be less than 20 characters")
          : setNameError(null);

        break;
      case "email":
        setEmail(value);
        !validateEmail(value)
          ? setEmailError("Please enter a valid email address")
          : setEmailError(null);

        break;

      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        label="Name"
        value={name}
        name="name"
        onChange={handelOnChange}
        error={nameError}
      />
      <CustomInput
        label="Email"
        value={email}
        name="email"
        onChange={handelOnChange}
        error={emailError}
      />
      <Select
        options={options}
        isMultiple={isMultipleSelect}
        placeholder={isMultipleSelect ? "Select options" : "Select option"}
        onSelect={handleSelect}
        initialValue={selectedOptions}
      />
      {selectedOptionsError && (
        <p style={{ color: "red" }}>{selectedOptionsError}</p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
