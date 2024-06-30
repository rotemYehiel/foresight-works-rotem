import { memo, useEffect, useRef, useState } from "react";

interface Option<T> {
  label: string;
  value: NonNullable<T>;
}

interface SelectProps<T> {
  options: Option<T>[];
  isMultiple?: boolean;
  placeholder?: string;
  initialValue?: NonNullable<T> | NonNullable<T>[] | null;
  onSelect: (selected: NonNullable<T> | NonNullable<T>[]) => void;
}

const Select = <T,>({
  options,
  isMultiple = false,
  placeholder = "Select...",
  initialValue,
  onSelect,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<
    NonNullable<T> | NonNullable<T>[] | null
  >(initialValue || (isMultiple ? [] : null));
  const [filter, setFilter] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const isChanged = useRef<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    if (isChanged.current)
      onSelect(selected as NonNullable<T> | NonNullable<T>[]);
  }, [selected]);

  const handleSelect = (value: NonNullable<T>) => {
    if (isMultiple) {
      const newArray = Array.isArray(selected) ? [...selected] : [];
      if (newArray.includes(value)) {
        setSelected(newArray.filter((item) => item !== value));
        isChanged.current = true;
      } else {
        setSelected([...newArray, value]);
        isChanged.current = true;
      }
    } else {
      setSelected(value);
      setIsOpen(false);
      isChanged.current = true;
    }
  };

  const handleSelectAll = () => {
    setSelected(options.map((option) => option.value));
    isChanged.current = true;
  };

  const handleDeselectAll = () => {
    setSelected(isMultiple ? [] : null);
    isChanged.current = true;
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );
  const renderOptions = () =>
    filteredOptions.map((option) => (
      <div key={option.value.toString()} className="option">
        {isMultiple ? (
          <label>
            <input
              type="checkbox"
              checked={
                Array.isArray(selected) && selected.includes(option.value)
              }
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
    ));

  return (
    <div className="select-container" ref={containerRef}>
      <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
        {isMultiple
          ? (selected as T[]).length
            ? `${(selected as T[]).length} selected`
            : placeholder
          : options.find((option) => option.value === selected)?.label ||
            placeholder}
      </div>
      {isOpen && (
        <div className="select-dropdown">
          {isMultiple && (
            <div className="select-all">
              <button onClick={handleSelectAll}>Select All</button>
              <button onClick={handleDeselectAll}>Deselect All</button>
            </div>
          )}
          <div className="select-filter">
            <input
              type="text"
              placeholder="Search..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="select-options">{renderOptions()}</div>
        </div>
      )}
    </div>
  );
};

export default memo(Select);
