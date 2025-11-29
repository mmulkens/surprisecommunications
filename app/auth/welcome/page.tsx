import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <img src="/icons/planet.svg" className="icon-ph"/>
      {/* <p className="text-lg mb-6">This is the</p> */}
      <h1 className="text-[34px]">Surprise Communications Dashboard</h1>
      <p>Please log in to access your personal dashboard and plan the next trip!</p>
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
