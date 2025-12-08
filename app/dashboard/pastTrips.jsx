"use client"

import { useState, useTransition } from "react";
import tripsFetch from "./getTrips";

export default function PastTrips( { initialYear, initialResults} ) {

  const years = [2025, 2024, 2022, 2019]
 
  const [selectedYear, setSelectedYear] = useState(initialYear)
  const [results, setResults] = useState(initialResults)
  const [isPending, startTransition] = useTransition()

  async function handleChange(e) {
    const year = Number(e.target.value);
    setSelectedYear(year);

    startTransition(async () => {
      const data = await tripsFetch(year);
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
            <div key={item.id} className="flex-1 text-sm mt-2 mb-1.5">
              <div className="text-white font-bold mb-1">Destination:</div>
              <div className="mb-2">{item.bestemming}, {item.land}</div>
              <div className="text-white font-bold mb-1">Departure date:</div>
              <div className="mb-2">{item.vertrekdatum}</div>
              <div className="text-white font-bold mb-1">Organizers:</div>
              <div className="my-2 flex justify-between px-8">
                <div className="flex-col">
                  <div className="w-22 h-22 mt-2 rounded-full bg-[url(/faz/Matthias.jpg)] bg-cover">
                    <div className="bg-white/10 border-2 border-white w-22 h-22 rounded-full"></div>
                  </div>
                  <div className="mt-1 text-white font-bold">Nizer</div>
                </div>
                <div className="flex-col">
                  <div className="w-22 h-22 mt-2 rounded-full bg-[url(/faz/Glenn.jpg)] bg-cover">
                    <div className="bg-white/20 border-2 border-white w-22 h-22 rounded-full"></div>
                  </div>
                  <div className="mt-1 text-white font-bold">Danny G</div>
                </div>
              </div>
            </div>
			    ))}
        </div>
      )}

      {/* {isPending && <p className="text-sm text-white">Loading...</p>} */}
    </div>
  )
}
