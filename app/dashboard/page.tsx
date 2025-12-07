import userDataFetch from "./getUser";
import userChanceFetch from "./getChance";
import userChancesFetch from "./getChances";
import BarChart from "./barChart";
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
				{/* // Section 1: Welcome */}

					<img src="/icons/planet.svg" className="icon-ph flex"/>
					<h1>Welcome, {nameToShow}</h1>
					<p>This is your personal <b>Surprise Dashboard</b>.
						Here you can consult your role for the upcoming trip as well as historical data on the Surprise Trip tradition. 
						You are currently logged in as <b>{user.email}</b> so secret information here is only accessible to you.
					</p>

				{/* // Section 2: User drawing chance */}

					<img src="/icons/manSettingFlag.svg" className="icon-ph"/>
					<p>The <b>chance</b> you had in the drawing for the upcoming edition's organizers is:</p>
					<div className="text-7xl my-3 text-center text-red-200 font-medium">{drawChance}%</div>
					
				{/* // Section 3: Barchart with all participants' chances */}

					<img src="/icons/parachute.png" className="icon-ph"/>
					<p>In relation to the <b>other participants</b>, your odds look as follows. Change the trip edition to see historical data</p>
						
					<BarChart
						profileId={profile?.id}
						initialYear={defaultYear}
						initialResults={initialResults}
					/>
					
				{/* // Section 4: Participant role */}

					<img src="/icons/dice.png" className="icon-ph flex"/>
					<p>Below you can discover <b>your mission</b> for the next edition. If you are an organizer, the name of your co-organizer will appear. If not, the traveler role will be shown.</p>
					
					<ToggleRole revealBelow={<div>{userRole[0].coorg.voornaam}</div>}>	

				{/* // Section 5: Organizer information */}

						{userRole[0].user_id == profile?.id ? (
							<>
								<img src="/icons/lock.png" className="icon-ph flex"/>
								<div className="text-lg text-white w-72 mt-4 min-h-10 font-bold p-1 bg-emerald-500 border-2 border-white rounded-xl content-center text-center">
									auth_user: {userRole[0].user_id}, 
									org_users: {userRole[0].user_id} & {userRole[0].coorganizer_id}
								</div>
								<div className="mt-4 p-4 w-72 bg-blue-500 border-2 border-white rounded-xl text-white">
									Nen hele bazaaar me info voor die boyz!
								</div>
							</>
							) : (
								null
							) 
						}
					</ToggleRole>

					

				{/* // Section 6: Log out	 */}
				
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
