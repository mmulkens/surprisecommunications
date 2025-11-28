import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import userDataFetch from "./getUser";
import  userChanceFetch from "./getChance";
import  userChancesFetch from "./getChances";
import { getDefaultAutoSelectFamily } from "net";

export default async function DashboardPage() {
  const { user, profile, nameToShow } = await userDataFetch();
  const { drawChance } = await userChanceFetch(); 
  const drawChances = await userChancesFetch();
  console.log("drawChances:", drawChances);
  return (
    <main>
      {user ? (
        <>
          <p className="text-8xl mb-6">🚀</p>
          <h1>Welcome, {nameToShow}</h1>
          <p>The chance you'll be the next organizer is</p>
          <div className="text-7xl bg-white/30 w-72 mt-6 rounded-lg pt-3 pb-4 px-6 text-center text-white font-bold">{drawChance}%</div>
          
          <div className="text-8xl my-6">🪁</div>
          
          <p>Other participants' chances are</p>
          <div className="w-72 mt-6 bg-white/30 p-4 rounded-lg">
            {drawChances.map((item, index) => (
              <div className="flex text-sm mt-1.5 mb-1.5">
                <span key="item.user_id" className="w-14 pr-2 text-xs text-white text-right">{item.users.voornaam}</span>
                <div className="h-4 flex-full flex w-48 rounded-full bg-white text-red-900">
                  <div 
                    style={{ width: `${12 + 6*item.kans_d}%` }}
                    className={`${item.user_id == profile?.id ? 'bg-red-500 text-white' : 'bg-red-200'} hover:bg-red-400 hover:text-white h-4 pr-px rounded-l-full text-xs text-right`}>
                      {item.kans_d}
                  </div>
                  <div className="h-4 ml-px text-xs">%</div>
                  
                </div>
              </div>
            ))}
          </div>

          <div className="text-8xl my-6">🎲</div>
          <p>Your role for the next trip will appear here.</p>
          
          <div className="text-6xl bg-white/30 w-72 mt-6 rounded-lg pt-3 pb-4 px-6 text-center text-white font-bold">Traveler</div>
          
          <form action="/auth/logout" method="post">
            <div className="flex justify-between mt-10">
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

//, backgroundColor: `${item.user_id == profile?.id ? "red" : "pink"}`