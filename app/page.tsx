import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to the Surprise Communications Dashboard</h1>
      <p className="text-lg">Please log in to access your dashboard and plan your next trip!</p>
      <div className="mt-4 justify-center flex gap-4">
        <Link href="/auth/login">
          <button className="bg-red-600 hover:bg-red-500">Log In</button> 
        </Link>
        <Link href="/auth/signup">
          <button className="bg-gray-400 hover:bg-gray-500">Sign Up</button>
        </Link>
      </div>
    </main>
  )
}
