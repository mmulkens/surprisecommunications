import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

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
    <main>
      <h1 className="text-4xl font-bold mb-4">If you're new, please sign up</h1>
      {searchParams.error && (
        <p style={{ color: "red" }}>{searchParams.error}</p>
      )}
      <p className="text-lg max-w-1/2">Register your name and e-mail to participate in the upcoming drawing of the next Surprise Trip</p>
      <div className="mt-4 justify-center flex gap-4">
      <form action={signUpNewUser} className="flex flex-col">
        <input name="mail" type="text" placeholder="First Name" required/>
        <input name="email" type="email" placeholder="E-mail" required/>
        <input name="password" type="password" placeholder="Password" required/>
        <div className="flex justify-between mt-2">
          <button type="submit" className="bg-red-600 hover:bg-red-500">Sign Up</button>
          <Link href="/auth/welcome">
            <button type="button" className="bg-gray-400 hover:bg-gray-500">Back</button>
          </Link>
        </div>
      </form>
      </div>
    </main>
  );
}
