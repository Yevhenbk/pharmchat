"use client";

import { useCountUp } from "@hooks/use-count-up";

interface Props {
  target: number;
  prefix?: string;
  separator?: boolean;
  delay?: number;
}

export function CountUpValue({
  target,
  prefix = "",
  separator = false,
  delay = 0,
}: Props) {
  const current = useCountUp({ target, delay });
  const displayValue = Math.round(current);

  const formatted = separator
    ? displayValue.toLocaleString("en-US")
    : String(displayValue);

  return (
    <>{prefix}{formatted}</>
  );
}
