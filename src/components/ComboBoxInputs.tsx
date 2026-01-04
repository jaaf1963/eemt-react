import React, { useState, useMemo } from "react";

interface OptionPanel {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: OptionPanel[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

const ComboBoxInputs: React.FC<ComboboxProps> = ({
  options,
  onSelect,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  //const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // Open dropdown when typing
    setIsOpen(true);
  };

  const handleOptionClick = (option: OptionPanel) => {
    //console.log("option.label:", option.label.slice(0, 2));
    if (option.label.slice(0, 2) !== "--") {
      setInputValue(option.label);
      onSelect(option.value);
      // Close dropdown after selection
      setIsOpen(false);
    }
  };

  return (
    <div className="combobox-container">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)} // Delay to allow clicks
        aria-autocomplete="list"
        aria-controls="combobox-list"

        //aria-expanded={isOpen}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul id="combobox-list" role="listbox" className="colorTextCboBoxXXX">
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={inputValue === option.label}
              style={{
                // ... estilos base ...
                // Cambia el color del fondo
                backgroundColor:
                  hoveredIndex === index ? "yellow" : "rgb(237, 235, 204)",
                padding: "10px",
                listStyle: "none",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {isOpen && filteredOptions.length === 0 && (
        <div className="no-results">No matches found</div>
      )}
    </div>
  );
};

export default ComboBoxInputs;
