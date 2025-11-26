'use client'
import Link from "next/link";
import signInWithEmail from "./logInInput";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-red-600 hover:bg-red-500 w-36 ${ pending && "opacity-50" }`}
    >
      {pending ? "Logging in..." : "Log in"}
    </button>
  );
}

export default function LoginPage() {
  return (
    <main>
      <h1>Log in to Access your Personal Dashboard</h1>
      <form action={signInWithEmail} className="flex flex-col">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <div className="flex justify-between mt-2">
          <Link href="/auth/welcome">
            <button type="button" className="bg-gray-400 hover:bg-gray-500">Back</button>
          </Link>
          <SubmitButton />
        </div>
      </form>
    </main>
  );
}
