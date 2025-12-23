'use client';

import Link from "next/link";
import signInWithEmail from "./logInInput";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

const initialState = {
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-red-600 hover:bg-red-500 w-36 ${pending && "opacity-50"}`}
    >
      {pending ? "Logging in..." : "Log in"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(signInWithEmail, initialState);

  return (
    <main>
      <img src="/icons/rocket.png" className="icon-ph" />
      <h1>Log in</h1>
      <p className="mb-6">Use your known surprise communication <br></br>credentials to access your dashboard.</p>

      <form action={formAction} className="flex flex-col">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />

        {/* Error banner */}
        {state.error && (
          <div className="bg-red-300 text-red-700 p-2 rounded-full px-4 py-2 m-1 text-sm">
            ❌ {state.error}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Link href="/auth/welcome">
            <button
              type="button"
              className="w-24 bg-gray-500/50 hover:bg-gray-200/50"
            >
              Back
            </button>
          </Link>
          <SubmitButton />
        </div>
      </form>
    </main>
  );
}
