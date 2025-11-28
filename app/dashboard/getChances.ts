import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'
import userDataFetch from "./getUser";	

type ChanceRow = {
  user_id: number;
  kans_d: number;
  users: {
    code: string;
    voornaam: string;
  };
};

export default async function userChancesFetch(): Promise<ChanceRow[]> {
  const { supabase } = await userDataFetch();

  const { data, error } = await supabase
    .schema("api")
    .from("kansen")
    .select(`
      user_id,
      kans_d,
      users:users!kansen_user_id_fkey (
        code,
        voornaam
      )
    `)
    .eq("trip_id", 5);

  if (error) {
    console.error(error);
    return [];
  }

  // Fix for type mismatch caused by Supabase returning correct runtime but wrong TS type
  return data as unknown as ChanceRow[];
}
