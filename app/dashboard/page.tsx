import userDataFetch from "./getUser";
import userChanceFetch from "./getChance";
import userPenaltyFetch from "./getPenalty";
import PenaltyChart from "./penaltyChart";
import userChancesFetch from "./getChances";
import BarChart from "./barChart";
import ToggleRole from "./toggleRole";
import userRoleFetch from "./getRole";
import tripsFetch from "./getTrips";
import PastTrips from "./pastTrips";

export default async function DashboardPage() {
	// Set the default year (hardcoded, should be active trip year)
	const defaultYear = 2026;
	// Get userdata: supabase user object, profile with user id and nickname/name
	const { user, profile, nameToShow } = await userDataFetch();
	// Get this year's drawing chance for the current user
	const { drawChance } = await userChanceFetch(defaultYear);
	// Get penalty data
	const initialPenaltyChart = await userPenaltyFetch(defaultYear, profile?.voornaam);
	// Get initial barchart state (for current year)
	const initialBarChart = await userChancesFetch(defaultYear);
	// Get the role for the upcoming trip
	const userRole = await userRoleFetch();
	// Get initial trip history state (for current year)
	const initialTripHistory = await tripsFetch(defaultYear-1);

	const unique = initialTripHistory?.filter(
        row => row.user_id < row.coorganizer_id
      );

	console.log("User Role:", userRole);
	console.log("User id:", profile);
	console.log("Trip:", unique);
	// console.log("Penalty:", penalty);
	// console.log("Recency-1:", checkPenalty(1));

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
					<p><b>Your chance</b> of being drawn to be one of the two organizers for the upcoming edition is:</p>
					<div className="text-7xl my-3 text-center text-red-200 font-medium">{drawChance}%</div>
					<p>The odds of having a duo with <b>two first-time organizers</b> is <b className="text-red-200">51.8%</b>, 
						while the chance of having a team of two organizers who both organized before is
						<b className="text-red-200"> 5.5%</b>.
					</p>
					<p>Having the same team as last year has a minor chace of <b className="text-red-200 text">0.22%</b>,
						while the least likely organizer combination (Joachim & Matthias) has only a chance of <b className="text-red-200">0.17%</b>.
					</p>

					<img src="/icons/cardChip.png" className="icon-ph"/>
					<p>Your chance is derived as follows. To start, each of the participants gets <b>ten points</b>. From those points a <b>penalty</b> is subtracted, 
						depending on how recently you have been an organizer. You get penalized up to five years ago, in an <b>exponentially</b> decreasing fashion as shown below.
						Penalties can only be accumulated to a <b>maximum of nine points</b> to avoid being entirely eliminated from the drawing.
					</p>
					<PenaltyChart
						profileId={profile?.id}
						initialPtcp={profile?.voornaam}
						initialResults={initialPenaltyChart}
					/>
					{/* <div className="w-56 border-b-2 mt-3 mb-6 pl-2 pb-1 border-red-300/80 border-dashed text-red-300 text-sm">-9</div> */}
					<p>The points you retain form the <b>weights</b> in the sampling of two organizers.
						Divided by the total of remaining points across all participants, they return your sampling odds.
					</p>
					
				{/* // Section 3: Barchart with all participants' chances and historic chances*/}

					<img src="/icons/parachute.png" className="icon-ph"/>
					<p>In relation to the <b>other participants</b>, those odds look as follows. Change the trip edition to see historical data.</p>
						
					<BarChart
						profileId={profile?.id}
						initialYear={defaultYear}
						initialResults={initialBarChart}
					/>					
					
				{/* // Section 4: Participant role */}

					<img src="/icons/dice2.png" className="icon-ph flex"/>
					<p>Below you can discover <b>your mission</b> for the next edition. If you are an organizer, the name of your co-organizer will appear. If not, the traveler role will be shown.</p>
					
					<ToggleRole revealBelow={<div>{userRole[0].coorg.voornaam}</div>}>	

				{/* // Section 5: Organizer information */}
						{userRole[0].user_id == profile?.id ? (
							<>
								<img src="/icons/lock.png" className="icon-ph flex"/>
								{/* <div className="text-lg text-white w-72 mt-4 min-h-10 font-bold p-1 bg-emerald-500 border-2 border-white rounded-xl content-center text-center">
									auth_user: {userRole[0].user_id}, 
									org_users: {userRole[0].user_id} & {userRole[0].coorganizer_id}
								</div> */}
								<p>Dear {userRole[0].user.voornaam}, you have been selected to organize the <b>{defaultYear} edition of the Surprise Trip </b> 
									together with <b>{userRole[0].coorg.voornaam}</b>. Congratulations!
								</p>
								<p>To be successful at it, secret communication is key. Therefore access to the <b>surprise mailbox</b> is now being transferred to you.</p>
								<p>The previous organizers have cleaned up their browser cache and password for the account, so a password reset is not strictly necessary.
									Should you decide to alter it, make sure to <b>securely store</b> the new password for handover to the organizers of the {defaultYear+1} edition. 
									Two-factor authentication is disabled for the account.
								</p>
								<div className="w-72 my-6 bg-white/30 p-4 rounded-2xl text-red-100 justify-items-center text-center">
									<div className="text-[15px]">surprisecommunications@proton.me</div>
									<div className="text-xl font-mono">DOqMCPqiw6n0jJi</div>
								</div>
								<p>The dates for this edition have already been set, so the next steps are getting hands on with the practicalities of the organization.</p>
								<p>Good luck!</p>
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
						initialYear={defaultYear-1}
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
