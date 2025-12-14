// app/dashboard/ToggleRole.tsx
'use client';

import { useState } from "react";

export default function ToggleRole({
  children,
  revealBelow, // the text that appears inside the button when expanded
}: {
  children: React.ReactNode,
  revealBelow: React.ReactNode,
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {/* CLICKABLE BUTTON */}
      <div
        onClick={() => setIsVisible(!isVisible)}
        className="
          bg-white/30 w-72 min-h-18 my-6 rounded-2xl p-3 text-center content-center font-bold 
          select-none cursor-pointer
        "
      >
        {/* TEXT WRAPPER WITH TRANSITIONS */}
        <div
          className={`
            transition-all duration-700 ease-out
            ${isVisible 
              ? "text-5xl text-white/30 opacity-100"  // starts faded (white/30), grows to 5xl
              : "text-2xl text-red-100 opacity-40"    // small, muted
            }
          `}
        >
          {/* HIDDEN STATE LABEL */}
          {!isVisible && <div>Tap to reveal</div>}

          {/* REVEAL TEXT (fades from text-white/30 to text-red-100) */}
          <div
            className={`
              transition-all duration-700 ease-out
              ${isVisible 
                ? "opacity-100 text-red-100" 
                : "opacity-0"
              }
            `}
          >
            {isVisible && revealBelow}
          </div>
        </div>
      </div>

      {/* SLIDE-DOWN CONTENT BELOW */}
      <div
        className={`
          max-w-80 flex flex-col items-center
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        {children}
      </div>
    </>
  );
}
