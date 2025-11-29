'use client'
import Link from "next/link";
import signUpNewUser from "./signUpInput";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={` bg-red-600 hover:bg-red-500 w-36 ${ pending && "opacity-50" }`}
    >
      {pending ? "Signing Up..." : "Sign Up"}
    </button>
  );
}

export default function signUpPage() {
  function submitStatus() {
    const { pending } = useFormStatus();
    return pending ? "Signing Up..." : "Sign Up";
  }
  return (
    <main>
      <img src="/icons/manSettingFlag.svg" className="icon-ph"/>
      <h1>Sign up</h1>
      <p className="text-center">Register your name and e-mail to access your role on the upcoming Surprise Trip</p>
      <div className="mt-4 justify-center flex gap-4">
      <form action={signUpNewUser} className="flex flex-col">
        <input name="fname" type="text" placeholder="First Name" required/>
        <input name="lname" type="text" placeholder="Last Name" required/>
        <input name="email" type="email" placeholder="E-mail" required/>
        <input name="password" type="password" placeholder="Password" required minLength={8}/>
        <input name="nname" type="text" placeholder="Nickname (optional)" maxLength={20}/>
        <div className="flex justify-between mt-2">
          <Link href="/auth/welcome">
            <button type="button" className="bg-gray-400 hover:bg-gray-500">Back</button>
          </Link>
          <SubmitButton />
        </div>
      </form>
      </div>
    </main>
  );
}
