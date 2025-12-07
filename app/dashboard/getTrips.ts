"use server"

import userDataFetch from "./getUser";

type TripRow = {
  id: number,
  bestemming: string,
  land: string,
  vertrekdatum: Date
};

export default async function tripsFetch(year: number): Promise<TripRow[]> {
  const { supabase } = await userDataFetch();

  const { data, error } = await supabase
    .schema("api")
    .from("trips")
    .select(`
      id,
      bestemming,
      land,
      vertrekdatum
      `)
    .filter("jaar", 'eq', year)
    ;

  if (error) {
    console.error(error);
    return [];
  }

  // Fix for type mismatch caused by Supabase returning correct runtime but wrong TS type
  return data as unknown as TripRow[];
}
