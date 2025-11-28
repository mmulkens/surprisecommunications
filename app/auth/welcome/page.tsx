import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <p className="bg-white/90 px-5 py-8 rounded-full text-6xl">🏕️</p>
      <h3 className="text-2xl my-6">WELCOME TO THE</h3>
      <h1>Surprise Communications Dashboard</h1>
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
