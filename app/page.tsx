import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default function HomePage() {
  return (
    <main className="flex min-h-screen max-v-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Trip Planner</h1>
      
    </main>
  )
}
