// RadioButtonGroup.tsx
import React, { useState } from "react";

interface RadioButtonProps {
  label: string;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

// Sub-componente para cada botón de opción
const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
}) => {
  return (
    <div style={{ marginLeft: "15px" }}>
      <label>
        <input
          type="radio"
          name="myRadioGroup" // El mismo nombre para agruparlos
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
        />{" "}
        {label}
      </label>
    </div>
  );
};

interface RadioButtProps {
  options: { label: string; value: string }[];
  onOptionChange: (value: string) => void;
  defaultValue?: string;
}

const RadioButtonGroup: React.FC<RadioButtProps> = ({
  options,
  onOptionChange,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    onOptionChange(value);
  };

  return (
    <>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={handleRadioChange}
        />
      ))}
    </>
  );
};

export default RadioButtonGroup;
