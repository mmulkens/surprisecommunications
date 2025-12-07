"use client"

import { useState, useTransition } from "react";
import userChancesFetch from "./getChances";

export default function BarChart( {profileId, initialYear, initialResults} ) {

  const years = [2026, 2025, 2024, 2022, 2019]
 
  const [selectedYear, setSelectedYear] = useState(initialYear)
  const [results, setResults] = useState(initialResults)
  const [isPending, startTransition] = useTransition()

  async function handleChange(e) {
    const year = Number(e.target.value);
    setSelectedYear(year);

    startTransition(async () => {
      const data = await userChancesFetch(year);
      setResults(data);
    })
  }

  return (
    <div className="w-72 my-6 bg-white/30 p-4 rounded-2xl text-center">
      <select 
        value={selectedYear}
        onChange={handleChange}
        className="border-white px-2 py-1 mb-4 rounded-lg bg-white/30 text-white focus:text-red-900 font-medium"
      >
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      {results && (
        <div >
          {results.map((item) => (
            <div key={item.user_id} className="flex text-sm mt-2 mb-1.5">
              <span className="w-14 pr-2 text-xs text-white text-right">{item.users.voornaam}</span>
              <div className="h-4 flex-full flex w-48 rounded-full bg-red-100 text-red-900">
                <div 
                  style={{ width: `${12 + 6*item.kans_d}%` }}
                  className={`${item.user_id == profileId ? 'bg-red-500 text-white' : 'bg-red-200'} hover:bg-red-400 active:bg-red-400 hover:text-white h-4 pr-px rounded-l-full text-xs text-right transition-[width] duration-700 ease-in-out`}>
                    {item.kans_d}
                </div>
                <div className="h-4 ml-px pr-1 text-xs">%</div>
              </div>
            </div>
			    ))}
        </div>
      )}

      {/* {isPending && <p className="text-sm text-white">Loading...</p>} */}
    </div>
  )
}
