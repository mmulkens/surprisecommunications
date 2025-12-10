import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'
import userDataFetch from "./getUser";	


export default async function userChanceFetch(year: number) {
	// 1. Get user data and supabase client
	const { user, supabase, nameToShow, profile } = await userDataFetch();

	// 2. Fetch matching profile from your api.users table
	const { data: chance, error: error } = await supabase
		.schema("api")
		.from("kansen")
		.select("kans_d")
		.eq("trip_id", 5) // still hardcoded
		.eq("user_id", profile?.id)
		.single();

	if (error) {
		console.error("Profile load error:", error);
	}

	const drawChance = chance?.kans_d || "?";
	return { user, drawChance };

}
