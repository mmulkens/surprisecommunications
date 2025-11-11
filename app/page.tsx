'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    setMessage(error ? error.message : 'Check your email for a confirmation link!')
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else router.push('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-3 w-80">
        <h1 className="text-2xl font-bold text-center">Holiday Trip Portal</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <div className="flex gap-2 justify-center mt-2">
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>
          <button
            onClick={handleSignUp}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Sign Up
          </button>
        </div>
        {message && <p className="text-sm text-center text-gray-600 mt-2">{message}</p>}
      </div>
    </main>
  )
}
