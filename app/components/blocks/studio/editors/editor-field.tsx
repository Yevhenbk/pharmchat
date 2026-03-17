import { cn } from "@utilities/tailwind";

import styles from "./editors.module.scss";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

export function TextField({
  label,
  value,
  onChange,
  multiline = false,
}: TextFieldProps) {
  if (multiline) {
    return (
      <div className={styles.field}>
        <label className={styles.fieldLabel}>{label}</label>

        <textarea
          className={cn(styles.fieldInput, styles.fieldTextarea)}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    );
  }

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>

      <input
        type="text"
        className={styles.fieldInput}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function NumberField({
  label,
  value,
  onChange,
}: NumberFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>

      <input
        type="number"
        className={styles.fieldInput}
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>

      <select
        className={cn(styles.fieldInput, styles.fieldSelect)}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
