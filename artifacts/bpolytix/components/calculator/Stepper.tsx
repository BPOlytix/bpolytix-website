"use client";

import { Minus, Plus } from "lucide-react";

type StepperProps = {
  label: string;
  value: number;
  onChange: (next: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
};

export function Stepper({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
}: StepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;
  const display = format ? format(value) : value.toLocaleString("en-ZA");

  return (
    <div className="flex flex-col gap-2">
      <div
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
          color: "#8892A4",
        }}
      >
        {label}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => !atMin && onChange(Math.max(min, value - step))}
          disabled={atMin}
          aria-label={`Decrease ${label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            backgroundColor: "#111F2E",
            border: "1px solid #1E2D3D",
          }}
        >
          <Minus size={16} color="#1B77F2" strokeWidth={2.25} />
        </button>
        <div
          className="flex min-w-[88px] items-center justify-center px-3 py-2"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: 20,
            fontWeight: 700,
            color: "#F5F7FA",
          }}
        >
          {display}
        </div>
        <button
          type="button"
          onClick={() => !atMax && onChange(Math.min(max, value + step))}
          disabled={atMax}
          aria-label={`Increase ${label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            backgroundColor: "#111F2E",
            border: "1px solid #1E2D3D",
          }}
        >
          <Plus size={16} color="#1B77F2" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
