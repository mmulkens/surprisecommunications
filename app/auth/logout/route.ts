"use server";
import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/welcome");
  // return NextResponse.redirect(new URL("/auth/welcome", req.url));
}
