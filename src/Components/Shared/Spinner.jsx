import React from "react";

const KenyaSpinner = ({ size = 80, text = "Loading" }) => {
  const ringWidth = size * 0.12;
  const coreSize = size * 0.38;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4">
      {/* Spinner Container */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Rotating arc ring */}
        <div
          className="absolute rounded-full animate-spin"
          style={{
            width: size,
            height: size,
            border: `${ringWidth}px solid transparent`,
            borderTop: `${ringWidth}px solid #dc2626`, // red arc
            borderRight: `${ringWidth}px solid #16a34a`, // green arc
            borderBottom: `${ringWidth * 0.6}px solid rgba(255,255,255,0.8)`, // reduced white arc
            borderLeft: `${ringWidth}px solid #111827`, // black arc (zips the gap)
          }}
        />

        {/* Central core */}
        <div
          className="rounded-full shadow-lg animate-pulse"
          style={{
            width: coreSize,
            height: coreSize,
            background: "radial-gradient(circle at top, #22c55e, #dc2626)",
          }}
        />
      </div>

      {/* Text */}
      <p className="uppercase tracking-widest font-semibold text-gray-700 text-sm">
        {text}
      </p>
    </div>
  );
};

export default KenyaSpinner;
