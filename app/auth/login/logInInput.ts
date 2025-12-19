"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type LoginState = {
  error?: string;
};

export default async function signInWithEmail(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}
