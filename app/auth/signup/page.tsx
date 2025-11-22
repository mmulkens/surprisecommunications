import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default function SignupPage({ searchParams }: { searchParams: any }) {
  async function signUpNewUser(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) { 
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
   };

  redirect("/dashboard");
}


  return (
    <main className="flex min-h-screen max-v-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Trip Planner</h1>
      {searchParams.error && (
        <p style={{ color: "red" }}>{searchParams.error}</p>
      )}
      <p className="text-lg">Please log in to access your dashboard and plan your next trip!</p>
      <div className="mt-4 justify-center flex gap-4">
      <form action={signUpNewUser}>
        <input name="email" type="email" placeholder="E-mail" required className="border p-2 rounded-full"/>
        <input name="password" type="password" placeholder="Password" required className="border-2 border-white p-2 rounded-full"/>
        <button type="submit" className="px-4 py-2 min-w-24 bg-red-600 border-2 text-white font-medium rounded-full hover:bg-red-500">Sign Up</button>
      </form>
      </div>
    </main>
  );
}
