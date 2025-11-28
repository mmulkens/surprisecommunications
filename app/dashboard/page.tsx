import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import userDataFetch from "./getUser";
import  userChanceFetch from "./getChance";
import  userChancesFetch from "./getChances";



export default async function DashboardPage() {
  const { user, nameToShow } = await userDataFetch();
  const { drawChance } = await userChanceFetch(); 
  const drawChances = await userChancesFetch();

  return (
    <main>
      {user ? (
        <>
          <p className="text-8xl mb-6">🪂</p>
          <h1>Welcome, {nameToShow}</h1>
          <p>Your role for the next trip will appear here.</p>
          <p>The chance you'll be the next organizer is</p>
          <p className="text-8xl text-orange-400 font-bold">{drawChance}%</p>

          <ol type="1">
            {drawChances.map((item, index) => (
              <li key={index}>{item.kans_d}</li>
            ))}
          </ol>
          
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