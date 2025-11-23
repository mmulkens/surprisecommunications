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
    <main>
      {user ? (
        <>
          <h1>Welcome, {user.email}</h1>
          <p>Your role for the next trip will appear here.</p>
          <form action="/auth/logout" method="post">
            <div className="flex justify-between mt-2">
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
