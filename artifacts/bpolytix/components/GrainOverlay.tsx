export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: "url('/grain.png')",
        backgroundSize: "256px 256px",
        backgroundRepeat: "repeat",
        mixBlendMode: "overlay",
        opacity: 0.6,
      }}
    />
  );
}
