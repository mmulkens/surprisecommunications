'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/')
      else setUser(data.user)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {user ? (
        <>
          <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg flex-col gap-3">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
          <p>Your role for the next trip will appear here.</p>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log out
          </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}
