import userDataFetch from "./getUser";
import userChanceFetch from "./getChance";
import userChancesFetch from "./getChances";
import BarChart from "./barChart";
import ToggleRole from "./toggleRole";
import userRoleFetch from "./getRole";
import tripsFetch from "./getTrips";
import PastTrips from "./pastTrips";

export default async function DashboardPage() {
	// Get userdata: supabase user object, profile with user id and nickname/name
	const { user, profile, nameToShow } = await userDataFetch();
	// Get this year's drawing chance for the current user
	const { drawChance } = await userChanceFetch();
	// Set the default year (hardcoded, should be active trip year)
	const defaultYear = 2026;
	// Get initial barchart state (for current year)
	const initialBarChart = await userChancesFetch(defaultYear);
	// Get the role for the upcoming trip
	const userRole = await userRoleFetch();
	// Get initial trip history state (for current year)
	const initialTripHistory = await tripsFetch(defaultYear-1);

	console.log("User Role:", userRole);
	console.log("User id:", profile);
	console.log("Trip:", initialTripHistory);

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
					<p>The <b>chance</b> you had in the drawing for picking the organizers for the upcoming edition is:</p>
					<div className="text-7xl my-3 text-center text-red-200 font-medium">{drawChance}%</div>

					
					<img src="/icons/abacus.png" className="icon-ph"/>
					<p>Before the drawing each of the participants gets 10 points. From those points a <b>penalty</b> is subtracted, 
						which is based on the recency of the participant's role as organizer.
						Penalties can be accumulated to a maximum of nine.
					</p>
					<div className="w-56 my-6 flex justify-between text-red-100 text-sm">
						<div className="w-8 flex-col justify-items-center">
							<div className="font-bold mb-2">5</div>
							<div className="w-4 h-6 bg-red-300/80 hover:bg-red-500 active:bg-red-500"></div>
							<div className="text-sm text-red-200 mt-1">-1<sup>.21</sup></div>
						</div>
						<div className="w-8 flex-col justify-items-center">
							<div className="font-bold mb-2">4</div>
							<div className="w-4 h-8 bg-red-300/80 hover:bg-red-500 active:bg-red-500"></div>
							<div className="text-sm text-red-200 mt-1">-1<sup>.49</sup></div>
						</div>
						<div className="w-8 flex-col justify-items-center">
							<div className="font-bold mb-2">3</div>
							<div className="w-4 h-12 bg-red-300/80 hover:bg-red-500 active:bg-red-500"></div>
							<div className="text-sm text-red-200 mt-1">-2<sup>.18</sup></div>
						</div>
						<div className="w-8 flex-col justify-items-center">
							<div className="font-bold mb-2">2</div>
							<div className="w-4 h-25 bg-red-300/80 hover:bg-red-500 active:bg-red-500"></div>
							<div className="text-sm text-red-200 mt-1">-5<sup>.14</sup></div>
						</div>
						<div className="w-8 flex-col justify-items-center">
							<div className="font-bold mb-2">1</div>
							<div className="w-4 h-33 bg-red-300/80 hover:bg-red-500 active:bg-red-500"></div>
							<div className="text-sm text-red-200 mt-1">-6<sup>.64</sup></div>
						</div>
					</div>
					{/* <div className="w-56 border-b-2 mt-3 mb-6 pl-2 pb-1 border-red-300/80 border-dashed text-red-300 text-sm">-9</div> */}
					<p>The remaining points then form the <b>weights</b> for the sampling of two organizers.
						Each participants points divided by the total remaining points gets each participants' sampling odds.
					</p>
					
				{/* // Section 3: Barchart with all participants' chances and historic chances*/}

					<img src="/icons/parachute.png" className="icon-ph"/>
					<p>In relation to the <b>other participants</b>, those odds looked as follows. Change the trip edition to see historical data</p>
						
					<BarChart
						profileId={profile?.id}
						initialYear={defaultYear}
						initialResults={initialBarChart}
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

				{/* // Section 6: Organizer history */}

					<img src="/icons/rocket.png" className="icon-ph flex"/>
					<p>Feeling nostalgic? Below you find the <b>history of past trips</b> made since 2019.</p>

					<PastTrips
						initialYear={defaultYear}
						initialResults={initialTripHistory}
					/>

				{/* // Section 7: Log out	 */}
				
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
