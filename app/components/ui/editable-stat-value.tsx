"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@utilities/tailwind";

interface Props {
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  separator?: boolean;
  className?: string;
}

function formatDisplay(
  value: number,
  prefix?: string,
  separator?: boolean,
): string {
  const formatted = separator
    ? value.toLocaleString("en-US")
    : String(value);

  return `${prefix ?? ""}${formatted}`;
}

export function EditableStatValue({
  value,
  onChange,
  prefix,
  separator,
  className,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.select();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInputValue(String(value));
    }
  }, [value, isEditing]);

  const commit = () => {
    const parsed = parseInt(inputValue, 10);

    if (!Number.isNaN(parsed) && parsed >= 0) {
      onChange(parsed);
    } else {
      setInputValue(String(value));
    }

    setIsEditing(false);
  };

  const cancel = () => {
    setInputValue(String(value));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        min={0}
        value={inputValue}
        onChange={(event_) => setInputValue(event_.target.value)}
        onBlur={commit}
        onKeyDown={(event_) => {
          if (event_.key === "Enter") {
            commit();
          }

          if (event_.key === "Escape") {
            cancel();
          }
        }}
        className={cn(
          "w-28 rounded border border-[#cbd5e1]/60 bg-transparent text-right",
          "text-[18px] font-600 text-[#1e293b] tabular-nums",
          "focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/10",
          "px-1",
          "[appearance:textfield]",
          "[&::-webkit-inner-spin-button]:appearance-none",
          "[&::-webkit-outer-spin-button]:appearance-none",
          className,
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      title="Click to edit"
      className={cn(
        "group flex cursor-text items-baseline gap-1",
        "text-[18px] font-600 text-[#1e293b] tabular-nums",
        className,
      )}
    >
      <span className="transition-colors group-hover:text-[#475569]">
        {formatDisplay(value, prefix, separator)}
      </span>
      <span className="select-none text-[11px] font-normal text-transparent transition-colors group-hover:text-[#94a3b8]">
        ✎
      </span>
    </button>
  );
}
