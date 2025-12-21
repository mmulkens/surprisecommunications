"use client"

import { useState, useTransition } from "react";
import userPenaltyFetch from "./getPenalty";

export default function PenaltyChart( {profileId, initialPtcp, initialResults} ) {

  const participants = ["Anton", "Anthony", "Erik", "Frederik", "Glenn", "Joachim", "Matthias", "Mickey", "Tom", "Ward", "Yoël"];

  const [selectedPtcp, setSelectedPtcp] = useState(initialPtcp)
  const year = 2026
  const [results, setResults] = useState(initialResults)
  const [isPending, startTransition] = useTransition()

  async function handleChange(e) {
    const ptcp = String(e.target.value);
    setSelectedPtcp(ptcp);

    startTransition(async () => {
      const data = await userPenaltyFetch(year, ptcp);
      setResults(data);
    })
  }
  console.log(results);

  // Get penalty data
  const checkPenalty = (penRecency) => results.some( ({recency}) => recency == penRecency);
  const sumPenalty = results.reduce((sum, current) => sum + current.penalty, 0 );

  return (
    <div className="w-72 my-6 bg-white/30 p-4 rounded-2xl text-center">
      <select 
        value={selectedPtcp}
        onChange={handleChange}
        className="border-white px-2 py-1 mb-4 rounded-lg bg-white/30 text-white focus:text-red-900 font-medium"
      >
        {participants.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {results && (
        <div >
          <div className="relative">
						<div className="absolute left-8 bottom-0 w-24 flex flex-col items-center">
							<div className="mb-2 text-sm text-red-100">Your penalty is</div>
							<div className="text-5xl font-bold text-red-600/60 leading-none">
								{Math.ceil(sumPenalty)}
								<sup>.{Math.round(-100 * (sumPenalty % 1))}</sup>
							</div>
						</div>
						<div className="w-full flex justify-between text-red-100 text-sm mb-2 px-4">
							{[5,4,3,2,1].map((year,i) => (
							<div key={year} className="flex flex-col items-center w-8">
								<div className="font-bold mb-1">{year}</div>

								{/* bar */}
								<div
								className={`${checkPenalty(year) ? 'bg-red-600/60' : 'bg-red-100/80'} 
									rounded-full w-4 transition-all duration-700 ease-in-out`}
								style={{
									height: [
									'30px',   // year 5
									'37px',   // year 4
									'54px',  // year 3
									'127px',  // year 2
									'165px',  // year 1
									][i]
								}}
								/>

								{/* bottom label */}
								<div className="mt-2 text-red-100">
                  <span className="text-sm">
                  {['-1','-1','-2','-5','-6'][i]}
                  </span>
                  <sup className="text-xxs">
                  {['.21','.49','.18','.14','.64'][i]}
                  </sup>
                </div>
							</div>
							))}

						</div>
					</div>
        </div>
      )}

    </div>
  )
}
