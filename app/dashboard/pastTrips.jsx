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
      const unique = data?.filter(
        row => row.user_id <= row.coorganizer_id
      );
      setResults(unique);
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
            <div key={item.user_id} className="flex-1 text-sm mt-2 mb-1.5">
              <div className="text-white font-bold mb-1">Destination:</div>
              <div className="mb-2">{item.bestemming}, {item.land}</div>
              <div className="text-white font-bold mb-1">Departure date:</div>
              <div className="mb-2">{item.vertrekdatum}</div>
              <div className="text-white font-bold mb-1">Organizers:</div>

              <div className="my-2 flex justify-center px-8">
                <div className="flex-col">
                  <div className="bg-cover rounded-full border-2 border-white w-22 h-22 mx-2"
                    style={{ backgroundImage: `url(/faz/${item.org1}.jpg)` }}>
                  </div>
                  <div className="mt-1 text-white font-bold">{item.org1}</div>
                </div>
                {item.user_id === item.coorganizer_id ? null : (
                <div className="flex-col">
                  <div className="bg-cover rounded-full border-2 border-white w-22 h-22 mx-2"
                    style={{ backgroundImage: `url(/faz/${item.org2}.jpg)` }}>
                  </div>
                  <div className="mt-1 text-white font-bold">{item.org2}</div>
                </div>
                )}
              </div>
              
              
              <video controls preload="metadata" playsInline className="rounded-2xl mt-6">
                <source src={`/vid/reveal${item.jaar}.mp4`} type="video/mp4" />
                Your browser does not support video playback.
              </video>

            </div>
			    ))}
        </div>
      )}

      {/* {isPending && <p className="text-sm text-white">Loading...</p>} */}
    </div>
  )
}
