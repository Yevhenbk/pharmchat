"use client";

import { useState, useEffect } from "react";
import { cn } from "@utilities/tailwind";

interface Props {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function QuantityInput({
  value,
  onChange,
  className,
}: Props) {
  const [displayValue, setDisplayValue] = useState(String(value));

  useEffect(() => {
    setDisplayValue(String(value));
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setDisplayValue(inputValue);

    const parsed = parseInt(inputValue, 10);

    if (!Number.isNaN(parsed) && parsed >= 0) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(displayValue, 10);

    if (Number.isNaN(parsed) || parsed < 0) {
      setDisplayValue(String(value));

      return;
    }

    setDisplayValue(String(parsed));
  };

  return (
    <input
      type="number"
      min={0}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      className={cn(
        "h-7 w-16 rounded-md border border-border/20 bg-card-bg text-center",
        "px-2 text-xs text-text-primary tabular-nums",
        "transition-colors duration-[var(--transition-fast)]",
        "focus:border-warning focus:outline-none focus:ring-1 focus:ring-warning/20",
        "hover:border-border/40",
        "[appearance:textfield]",
        "[&::-webkit-inner-spin-button]:appearance-none",
        "[&::-webkit-outer-spin-button]:appearance-none",
        className,
      )}
    />
  );
}
