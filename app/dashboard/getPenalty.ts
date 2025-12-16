"use server"

import userDataFetch from "./getUser";

type PenaltyRow = {
  user_id: number;
  recency: number;
  penalty: number;
  trip: {
    jaar: number;
  };
  user: {
    voornaam: string;
  };
};

export default async function userPenaltyFetch(year: number, ptcp: string): Promise<PenaltyRow[]> {
  // 1. Get user data and supabase client
  const { supabase, profile } = await userDataFetch();
  
  // 2. Fetch penalty data
  const { data, error } = await supabase
    .schema("api")
    .from("penalties")
    .select(`
      user_id,
      recency,
      penalty,
			trip:trips!inner (
				jaar
		),
      user:users!inner (
        voornaam
      ) 
    `)
    .eq("user.voornaam", ptcp)
    .filter("trip.jaar", 'eq', year)
    .order("recency")
    ;

  if (error) {
    console.error(error);
    return [];
  }

  // Fix for type mismatch caused by Supabase returning correct runtime but wrong TS type
  return data as unknown as PenaltyRow[];
}
