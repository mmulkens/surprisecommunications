import userDataFetch from "./getUser";	

type RoleRow = {
	trip_id: number,
	user_id: number,
	coorganizer_id: number,
	trip: { volgende: boolean },
	user: { 
		voornaam: string,
	},
	coorg: { 
		voornaam: string
	}
};

export default async function userRoleFetch(): Promise<RoleRow[]> {
	const { user, supabase, profile } = await userDataFetch();

	const { data, error } = await supabase
		.schema("api")
		.from("organizers")
		.select(`
			trip_id,
			user_id,
			coorganizer_id,
			trip:trips!inner (
				volgende
		),
			user:users!organizers_user_id_fkey (
				voornaam
			),
			coorg:users!organizers_coorganizer_id_fkey (
				voornaam
			)
		`)
		.filter("trip.volgende", 'eq', true)
		.eq("user_id", profile?.id) // Secure: only fetch for logged in user
		;

		if (!data || data.length === 0) {
			return [
				{ 
					trip_id: 0,
					user_id: 0,
					coorganizer_id: 0,
					trip: { volgende: false },
					user: { 
						voornaam: "Traveler",
					},
					coorg: { 
						voornaam: "Traveler"
					},
				}
			];
		}

	if (error) {
		console.error(error);
		return [];
	}


	// Fix for type mismatch caused by Supabase returning correct runtime but wrong TS type
	return data as unknown as RoleRow[];
}
