import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {user ? (
        <>
          <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg flex-col gap-3">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
          <p>Your role for the next trip will appear here.</p>
          <form action="/auth/logout" method="post" className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          <button type="submit">Log out</button>
          </form>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}
