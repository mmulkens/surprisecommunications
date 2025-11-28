import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'
import userDataFetch from "./getUser";	


export default async function userChancesFetch() {
  const { supabase, profile } = await userDataFetch();

  const { data, error } = await supabase
    .schema("api")
    .from("kansen")
    .select("kans_d")
	.eq("trip_id", 5)
	.neq("user_id", profile?.id);
  
  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}
