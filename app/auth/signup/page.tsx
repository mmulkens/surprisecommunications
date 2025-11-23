import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default function SignupPage() {
  async function signUpNewUser(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // User info fields
  const firstName = formData.get("fname") as string;
  const lastName = formData.get("lname") as string;
  const nickname = formData.get("nname")?.toString() || null;


  // Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName, nickname }
  }
  });

  console.log("SignUp data:", data);
  console.log("SignUp error:", error);

  if (error) {
    throw new Error(error.message);
  }

  // If sign up is successful, upsert user info into api.users table
  const { error: upsertError } = await supabase
    .schema('api')
    .from("users")
    .upsert(
      {
        email: email,
        voornaam: firstName,
        achternaam: lastName,
        nickname: nickname,
        auth_userid: data.user?.id,
      },
      { onConflict: "email" }
    );

   if (upsertError) {
    throw new Error (upsertError.message);
  }

  redirect("/dashboard");
}


  return (
    <main>
      <h1>If you're new, please sign up</h1>
      <p className="text-center">Register your name and e-mail to participate in the upcoming drawing of the next Surprise Trip</p>
      <div className="mt-4 justify-center flex gap-4">
      <form action={signUpNewUser} className="flex flex-col">
        <input name="fname" type="text" placeholder="First Name" required/>
        <input name="lname" type="text" placeholder="Last Name" required/>
        <input name="email" type="email" placeholder="E-mail" required/>
        <input name="password" type="password" placeholder="Password" required/>
        <input name="nname" type="text" placeholder="Nickname (optional)"/>
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
