// app/dashboard/ToggleRole.tsx
'use client';

import { useState } from "react";

export default function ToggleRole({
  children,
  revealBelow,
}: {
  children: React.ReactNode,
  revealBelow: React.ReactNode,
}) {
  const [isVisible, setIsVisible] = useState(false);

  // Check if children actually contains something
  const hasChildren =
    children !== null &&
    children !== undefined &&
    !(Array.isArray(children) && children.length === 0);

  return (
    <>
      {/* CLICKABLE BUTTON */}
      <div
        onClick={() => setIsVisible(!isVisible)}
        className="bg-white/30 w-72 min-h-18 my-6 rounded-2xl p-3 text-center font-bold select-none cursor-pointer"
      >
        <div className="relative h-12 flex items-center justify-center">

          {/* TAP TO REVEAL  (always in DOM) */}
          <div
            className={`
              absolute transition-all duration-700 ease-in
              ${isVisible
                ? "opacity-0 scale-90"
                : "opacity-40 scale-100 text-2xl text-red-100"
              }
            `}
          >
            Tap to reveal
          </div>

          {/* REVEAL TEXT (always in DOM) */}
          <div
            className={`
              absolute transition-all duration-700 ease-in
              ${isVisible
                ? "opacity-100 scale-100 text-5xl text-red-100"
                : "opacity-0 scale-90 text-white/30"
              }
            `}
          >
            {revealBelow}
          </div>

        </div>
      </div>

      {/* SLIDE-DOWN CONTENT BELOW */}
      {hasChildren && (
      <div
        className={`
         overflow-hidden transition-all duration-500 delay-300 ease-in
          ${isVisible
            ? "min-h-182 opacity-100"
            : "min-h-0 opacity-0"
          }
        `}
      >
        <div className="max-w-80 py-2 flex flex-col items-center">
          {children}
        </div>
      </div>
      )}
    </>
  );
}
