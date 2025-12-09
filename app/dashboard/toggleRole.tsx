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

  return (
    <>
		<div className="bg-white/30 text-red-100 w-72 min-h-18 relative my-6 rounded-2xl p-3 content-center text-center font-bold cursor-grab select-none">
			<div onClick={() => setIsVisible(!isVisible)} className={isVisible ? "text-5xl transition-all duration-500 ease-in" : "text-2xl opacity-40"}>
				{isVisible ? "" : "Tap to reveal"}
				<div className={isVisible ? "" : "hidden"}>
					{revealBelow}
				</div>
      </div>
    </div>
		<div className={isVisible ? "max-w-80 flex flex-col items-center" : "hidden"}>
			{children}
		</div>
		</>
  );
}
