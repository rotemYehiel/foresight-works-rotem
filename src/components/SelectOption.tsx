export interface Option<T> {
  label: string;
  value: NonNullable<T>;
}

interface OptionProps<T> {
  option: Option<T>;
  isMultiple: boolean;
  selected: NonNullable<T> | NonNullable<T>[] | null;
  handleSelect: (value: NonNullable<T>) => void;
}

const SelectOption = <T,>({
  option,
  isMultiple,
  selected,
  handleSelect,
}: OptionProps<T>) => {
  return (
    <div key={option.value.toString()} className="option">
      {isMultiple ? (
        <label>
          <input
            type="checkbox"
            checked={Array.isArray(selected) && selected.includes(option.value)}
            onChange={() => handleSelect(option.value)}
          />
          {option.label}
        </label>
      ) : (
        <div
          className={`single-option ${
            selected === option.value ? "selected" : ""
          }`}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </div>
      )}
    </div>
  );
};

export default SelectOption;
