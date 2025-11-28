import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import userDataFetch from "./getUser";
import  userChanceFetch from "./getChance";
import  userChancesFetch from "./getChances";

export default async function DashboardPage() {
  const { user, nameToShow } = await userDataFetch();
  const { drawChance } = await userChanceFetch(); 
  const drawChances = await userChancesFetch();
  console.log("drawChances:", drawChances);
  return (
    <main>
      {user ? (
        <>
          <p className="text-8xl mb-6">🚀</p>
          <h1>Welcome, {nameToShow}</h1>
          <p>Your role for the next trip will appear here.</p>
          <p>The chance you'll be the next organizer is</p>
          <p className="text-7xl bg-white/30 w-64 rounded-lg pt-3 pb-4 px-6 text-center text-white font-bold my-6">{drawChance}%</p>
          
          <p className="text-8xl">🪂</p>
          <div className="mt-6 w-64 bg-white/30 p-4 rounded-lg">
            {drawChances.map((item, index) => (
              <div className="flex text-sm mt-1.5 mb-1.5">
                <span className="w-14 pr-2 text-xs text-white text-right">{item.users.voornaam}</span>
                <div className="h-4 flex-full flex w-40 rounded-full bg-white text-yellow-800">
                  <div 
                    className="bg-yellow-400 h-4 pr-px rounded-l-full text-xs text-right" 
                    style={{ width: `${12 + 6*item.kans_d}%`}}>
                      {item.kans_d}
                  </div>
                  <div className="h-4 ml-px text-xs">%</div>
                  
                </div>
              </div>
            ))}
          </div>
          
          <form action="/auth/logout" method="post">
            <div className="flex justify-between mt-6">
              <button type="submit" className="pt-4 bg-red-500 hover:bg-red-600">Log out</button>
            </div>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}