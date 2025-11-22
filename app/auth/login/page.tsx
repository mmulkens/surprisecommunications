import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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
      <h1>Log In</h1>
      {searchParams.error && (
        <p style={{ color: "red" }}>{searchParams.error}</p>
      )}
      <form action={signInWithEmail}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}
