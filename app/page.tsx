export default function HomePage() {
  return (
    <main className="flex min-h-screen max-v-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Trip Planner</h1>
      <p className="text-lg">Please log in to access your dashboard and plan your next trip!</p>
      <div className="mt-4 justify-center flex gap-4">
        <button className="px-4 py-2 min-w-24 bg-orange-400 text-white font-medium rounded-full hover:bg-amber-500">
          Log In
        </button>
        <button className="px-4 py-2 min-w-24 bg-gray-400 text-white font-medium rounded-full hover:bg-gray-500">
          Sign Up
        </button>
      </div>
    </main>
  )
}
