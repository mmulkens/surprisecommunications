"use server"

import userDataFetch from "./getUser";

type TripRow = {
  trip_id: number;
  user_id: string;
  coorganizer_id: string;
  trip: {
    jaar: number;
    bestemming: string;
    land: string;
    vertrekdatum: Date;
    volgende: boolean
  };
  user: {
    voornaam: string
  };
  coorg: {
    voornaam: string
  };
};

export default async function tripsFetch(year: number): Promise<TripRow[]> {
  const { supabase } = await userDataFetch();

  const { data, error } = await supabase
    .schema("api")
    .from("organizers")
    .select(`
      trip_id,
      user_id,
      coorganizer_id,
      trip:trips!inner(
        jaar,
        bestemming,
        land,
        vertrekdatum,
        volgende
      ),
			user:users!organizers_user_id_fkey (
        voornaam
			),
			coorg:users!organizers_coorganizer_id_fkey (
        voornaam
			)
      `)
    .filter("trip.jaar", "eq", year)
    .neq("trip.volgende", true)
    ;

  if (error) {
    console.error(error);
    return [];
  }

  // Fix for type mismatch caused by Supabase returning correct runtime but wrong TS type
  return data as unknown as TripRow[];
}
