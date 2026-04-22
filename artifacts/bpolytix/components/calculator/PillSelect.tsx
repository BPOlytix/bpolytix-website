"use client";

type PillSelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (next: T) => void;
};

export function PillSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: PillSelectProps<T>) {
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
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className="rounded-full px-4 py-2 text-[13px] transition-colors"
              style={{
                fontFamily: "var(--font-dm-sans)",
                backgroundColor: active ? "#1B77F2" : "#111F2E",
                color: active ? "#FFFFFF" : "#8892A4",
                border: active ? "1px solid #1B77F2" : "1px solid #1E2D3D",
                fontWeight: active ? 500 : 400,
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
