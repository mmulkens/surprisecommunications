"use client";

import { useState } from "react";

type Item = {
	name: string;
	p: number;
	count: number;
	u?: number;
	key?: number;
	rank?: number;
};

const INITIAL_ITEMS: Item[] = [
	{ name: "Anton", p: 12.41, count: 0 },
	{ name: "Anthony", p: 12.41, count: 0 },
	{ name: "Erik", p: 12.41, count: 0 },
	{ name: "Frederik", p: 12.41, count: 0 },
	{ name: "Glenn", p: 4.17, count: 0 },
	{ name: "Joachim", p: 3.33, count: 0 },
	{ name: "Matthias", p: 2.32, count: 0 },
	{ name: "Mickey", p: 6.03, count: 0 },
	{ name: "Tom", p: 12.41, count: 0 },
	{ name: "Ward", p: 12.41, count: 0 },
	{ name: "Yoël", p: 9.70, count: 0 },
];


export default function AResSimulation() {
	const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
	const [samples, setSamples] = useState(0);

	const sample = () => {
    const withRandom = items.map((item) => {
      const u = Math.random();
      return {
        ...item,
        u,
        key: 100 * u ** (100 / item.p),
      };
    });

		// Rank keys (descending)
		const sorted = [...withRandom].sort((a, b) => b.key! - a.key!);

		sorted.forEach((item, i) => {
			item.rank = i + 1;
		});

		// Increment counters for top 2
		const updated = withRandom.map((item) => {
			const selected = item.rank! <= 2 ? 1 : 0;
			return {
				...item,
				count: item.count + selected,
			};
		});

		setItems(updated);
		setSamples((s) => s + 1);
	};

	const reset = () => {
		setItems(INITIAL_ITEMS);
		setSamples(0);
	};

	const maxCount = Math.max(...items.map((i) => i.count), 1);

	return (
    <div className="w-72 my-6 bg-white/30 p-4 rounded-2xl text-sm">
      {/* Controls */}
      <div className="flex items-center justify-baseline mb-2">
        <button
          onClick={sample}
					className="bg-red-600/50 hover:bg-red-600 active:bg-red-600"
        >
          Sample
        </button>
        <button
          onClick={reset}
          className="bg-gray-500/50 hover:bg-gray-200/50 active:bg-gray-200/50"
        >
          Reset
        </button>
        <div className="text-white text-[18px] bg-red-200/40 rounded-full 
					size-10 content-center text-center font-semibold ml-8">
						{samples}
				</div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[0.7fr_35px_35px_35px_27px_0.6fr] items-right gap-1 my-1 py-1 px-2 
					text-white text-right border-b border-red-100/40 font-semibold">
        <div className="text-left">Name</div>
        <div>1/p</div>
        <div>U</div>
        <div>Key</div>
        <div className="text-center">r</div>
        <div className="text-left">Count</div>
      </div>

      {/* Rows */}
      {items.map((item) => {
        const selected = item.rank !== undefined && item.rank <= 2;

        return (
          <div
            key={item.name}
            className={`grid grid-cols-[0.7fr_35px_35px_35px_27px_0.6fr] items-center gap-1 my-1 py-1 px-2 rounded-full	text-xs
              ${selected ? "bg-red-200/40" : ""}`}
          >
            <div className="text-white">{item.name}</div>
            <div className="text-right">{(100 / item.p).toFixed(1)}</div>
						<div className={`text-right
							${item.u !== undefined && item.u >= 0.9 ? "font-semibold text-gray-900" : ""}` }>
							{item.u?.toFixed(2) ?? "—"}
						</div>
            <div className="text-right">{item.key?.toFixed(2) ?? "—"}</div>
						<div className={`text-center
							${item.rank !== undefined && item.rank <= 2 ? 
								"bg-amber-400 mx-[3px] rounded-full font-bold" : 
								"text-red-200/60"}` }>
							{item.rank ?? "—"}
						</div>

            {/* Counter + bar */}
            <div className="relative h-3.5">
              <div className="absolute inset-0 bg-red-100/10" />
              <div
                className="absolute inset-0 bg-red-600/70"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                }}
              />
              <div className="relative text-center text-white leading-3.5">
                {item.count}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
