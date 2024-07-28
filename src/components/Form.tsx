import React, { useCallback, useState } from "react";
import Select from "./Select";
import "./Form.scss";
import CustomInput from "./CustomInput";

const options: Option[] = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  { label: "Option 4", value: 4 },
];

interface Option {
  label: string;
  value: number;
}

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<
    number[] | number | null
  >(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedOptionsError, setSelectedOptionsError] = useState<
    string | null
  >(null);

  const isMultipleSelect: boolean = false;

  const handleSelect = useCallback((selected: any) => {
    setSelectedOptions(selected);
    alert(`Selected: ${JSON.stringify(selected)}`);
  }, []);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    console.log({ isMultipleSelect, selectedOptions });

    if (
      (isMultipleSelect &&
        Array.isArray(selectedOptions) &&
        selectedOptions.length === 0) ||
      (isMultipleSelect && !selectedOptions) ||
      (!isMultipleSelect && selectedOptions === null)
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

  const handelOnChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [name, email]
  );

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
      <div className="select-wrapper">
        <Select
          options={options}
          isMultiple={isMultipleSelect}
          placeholder={isMultipleSelect ? "Select options" : "Select option"}
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
