"use client";
import { useState } from "react";
import "./styles/buttonGroup.css";
const ButtonGroup = ({
  buttonLabels,
  onChange,
}: {
  buttonLabels: { label: string; value: string }[];
  onChange: (x: string) => void;
}) => {
  const [selected, setSelected] = useState<number>(-1);
  const handleClick = (button_idx: number, buttonValue: string) => {
    setSelected(button_idx);
    onChange(buttonValue);
  };
  return (
    <div className="button-group">
      {buttonLabels.map(({ label, value }, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(idx, value)}
          className={
            idx === selected
              ? "button-group-button active"
              : "button-group-button"
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
};
export default ButtonGroup;
