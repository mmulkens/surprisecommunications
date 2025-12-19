"use server"

import userDataFetch from "./getUser";

type TripRow = {
  trip_id: number;
  jaar: number;
  bestemming: string;
  land: string;
  vertrekdatum: string;
  user_id: number;
  org1: string;
  coorganizer_id: number;
  org2: string;
};

export default async function tripsFetch(year: number): Promise<TripRow[]> {
  const { supabase } = await userDataFetch();

  const { data, error } = await supabase
    .schema("api")
    .from("v_trip_history")
    .select()
    .filter("jaar", "eq", year)
    ;

  if (error) {
    console.error(error);
    return [];
  }

  // Fix for type mismatch caused by Supabase returning correct runtime but wrong TS type
  return data as unknown as TripRow[];
}
