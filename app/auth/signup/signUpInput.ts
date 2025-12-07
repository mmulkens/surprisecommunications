"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function signUpNewUser(formData: FormData) {
	
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

	if (error) {
		throw new Error(error.message);
	}

	redirect("/dashboard");
}