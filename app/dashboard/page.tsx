import userDataFetch from "./getUser";
import userChanceFetch from "./getChance";
import userChancesFetch from "./getChances";
import YearFilter from "./barChart";
import ToggleRole from "./toggleRole";
import userRoleFetch from "./getRole";

export default async function DashboardPage() {
	// Get userdata: supabase user object, profile with user id and nickname/name
	const { user, profile, nameToShow } = await userDataFetch();
	// Get this year's drawing chance for the current user
	const { drawChance } = await userChanceFetch();
	// Set the default year (hardcoded, should be active trip year)
	const defaultYear = 2026;
	// Get initial barchart state (for current year)
	const initialResults = await userChancesFetch(defaultYear);
	// Get the role for the upcoming trip
	const userRole = await userRoleFetch();

	console.log("User Role:", userRole);
	console.log("User id:", profile);

	return (
		<main>
			{user ? (
				<>
					<img src="/icons/planet.svg" className="icon-ph flex"/>
					<h1>Welcome, {nameToShow}</h1>
					<p>This is your personal <b>Surprise Dashboard</b>.
						Here you can consult your role for the upcoming trip as well as historical data on the Surprise Trip tradition. 
						You are currently logged in as <b>{user.email}</b> so secret information here is only accessible to you.
					</p>

					<img src="/icons/manSettingFlag.svg" className="icon-ph"/>
					<p>The <b>chance</b> you had in the drawing for the upcoming edition's organizers is:</p>
					<div className="text-7xl my-3 text-center text-red-200 font-medium">{drawChance}%</div>
					
					<img src="/icons/parachute.png" className="icon-ph"/>
					<p>In relation to the <b>other participants</b>, your odds look as follows. Change the trip edition to see historical data</p>
						
					<div>
					<YearFilter
						profileId={profile?.id}
						initialYear={defaultYear}
						initialResults={initialResults}
					/>
					</div>
					

					<img src="/icons/dice.png" className="icon-ph flex"/>
					<p>Below you can discover <b>your mission</b> for the next edition. If you are an organizer, the name of your co-organizer will appear. If not, the traveler role will be shown.</p>
					
					<ToggleRole>
						{userRole.map(o => (
							<div key={o.coorganizer_id}>{o.coorg.voornaam}</div>
						))}
					</ToggleRole>

					<form action="/auth/logout" method="post">
						<div className="flex justify-between my-10">
							<button type="submit" className="bg-red-500 hover:bg-red-600">Log out</button>
						</div>
					</form>

				</>
			) : (
				<p>Loading...</p>
			)}

		</main>
	)
}
