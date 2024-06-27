import React, { memo, useEffect, useRef, useState } from "react";
import "./Select.scss";

interface Option {
  label: string;
  value: any;
}

interface SelectProps {
  options: Option[];
  isMultiple?: boolean;
  placeholder?: string;
  initialValue?: any;
  onSelect: (selected: any) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  isMultiple = false,
  placeholder = "Select...",
  initialValue = isMultiple ? [] : null,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>(initialValue);
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
    if (isChanged.current) onSelect(selected);
  }, [selected]);

  const handleSelect = (value: any) => {
    if (isMultiple) {
      if (selected.includes(value)) {
        setSelected(selected.filter((item: any) => item !== value));
        isChanged.current = true;
      } else {
        setSelected([...selected, value]);
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
    setSelected([]);
    isChanged.current = true;
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  const renderOptions = () =>
    filteredOptions.map((option) => (
      <div key={option.value} className="option">
        {isMultiple ? (
          <label>
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
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
          ? selected.length
            ? `${selected} selected`
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
