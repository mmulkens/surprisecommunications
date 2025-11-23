import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default function LoginPage({ searchParams }: { searchParams: any }) {
  async function signInWithEmail(formData: FormData) {
    "use server";

    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      redirect(`/signup?error=${encodeURIComponent(error.message)}`);
    }

    redirect("/dashboard");
  }

  return (
    <main>
      <h1>Log in to Access your Personal Dashboard</h1>
      {searchParams.error && (
        <p style={{ color: "red" }}>{searchParams.error}</p>
      )}
      <form action={signInWithEmail} className="flex flex-col">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <div className="flex justify-between mt-2">
          <button type="submit" className="bg-red-600 hover:bg-red-500">Log in</button>
          <Link href="/auth/welcome">
            <button type="button" className="bg-gray-400 hover:bg-gray-500">Back</button>
          </Link>
        </div>
      </form>
    </main>
  );
}
