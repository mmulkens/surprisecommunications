import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function userDataFetch() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Fetch matching profile from your api.users table
  const { data: profile, error } = await supabase
    .schema('api')
    .from("users")
    .select("voornaam, nickname")
  //  .eq("auth_userid", user.id)
    .single();

  if (error) {
    console.error("Profile load error:", error);
  }

  const nameToShow = profile?.nickname || profile?.voornaam || user.email;
  return { user, nameToShow };

}