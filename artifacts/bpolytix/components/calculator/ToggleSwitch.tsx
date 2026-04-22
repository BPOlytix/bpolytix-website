"use client";

type ToggleSwitchProps = {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
};

export function ToggleSwitch({ label, value, onChange }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
          color: "#8892A4",
        }}
      >
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className="relative h-7 w-12 rounded-full transition-colors duration-200"
        style={{
          backgroundColor: value ? "#1B77F2" : "#1E2D3D",
        }}
      >
        <span
          className="absolute top-1 h-5 w-5 rounded-full transition-all duration-200"
          style={{
            left: value ? "calc(100% - 1.25rem - 0.25rem)" : "0.25rem",
            backgroundColor: value ? "#FFFFFF" : "#8892A4",
          }}
        />
      </button>
    </div>
  );
}
