import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <img src="/icons/planet.svg" className="icon-ph"/>
      {/* <p className="text-lg mb-6">This is the</p> */}
      <h1 className="text-[34px]">Surprise Communications Dashboard</h1>
      <p>Please log in to access your personal dashboard and plan the next trip!</p>
      <div className="mt-4 justify-center flex">
        <Link href="/auth/login">
          <button className="w-24 bg-red-600 hover:bg-red-500">Log In</button> 
        </Link>
        <Link href="/auth/signup">
          <button className="w-24 bg-gray-500/50 hover:bg-gray-200/50">Sign Up</button>
        </Link>
      </div>
    </main>
  )
}
