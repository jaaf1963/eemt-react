import React from "react";

interface RadioButtonProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  checked,
  onChange,
}) => {
  return (
    <div>
      <input
        type="radio"
        id={value}
        name="opcion" // Mismo nombre para agruparlos
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default RadioButton;
