import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'

export default async function userChanceFetch() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Fetch matching profile from your api.users table
  const { data: localUser, error: error_user} = await supabase
    .schema("api")
    .from("users")
    .select("id")
    .eq("auth_userid", user.id)
    .single();

  const { data: chance, error: error_kans } = await supabase
    .schema("api")
    .from("kansen")
    .select("kans")
    .eq("trip_id", 5)
    .eq("user_id", localUser?.id)
    .single();

  if (error_user) {
    console.error("Profile load error:", error_user);
  }
  if (error_kans) {
    console.error("Profile load error:", error_kans);
  }

  const drawChance = Math.round(chance?.kans * 10000) / 100 || "?";
  return { user, drawChance };

}