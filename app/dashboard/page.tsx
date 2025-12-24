import userDataFetch from "./getUser";
import userChanceFetch from "./getChance";
import userPenaltyFetch from "./getPenalty";
import PenaltyChart from "./penaltyChart";
import userChancesFetch from "./getChances";
import BarChart from "./barChart";
import AResSimulation from "./aResSim";
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

	// console.log("User Role:", userRole);
	// console.log("User id:", profile);
	// console.log("Trip:", unique);
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
					<p>The odds of having a duo with <b>two first-time organizers</b> is <b className="highlight">51.8%</b>, 
						while the chance of having a team of two organizers who both organized before is
						<b className="highlight"> 5.5%</b>.
					</p>
					<p>Having the same team as last year has a minor chance of <b className="highlight">0.22%</b>,
						while the least likely organizer combination (Joachim & Matthias) has only a chance of <b className="highlight">0.17%</b>.
					</p>

					<img src="/icons/cardChip.png" className="icon-ph"/>
					<p>Your chance is derived as follows. To start, each of the participants gets <b>ten points</b>. From those points a <b>penalty</b> is subtracted, 
						depending on how recently you have been an organizer. You get penalized up to five years ago, in an <b>exponentially</b> decreasing fashion as shown below.
						Penalties can only be accumulated to a <b>maximum of nine points</b> to avoid being entirely eliminated from the drawing.</p>
					<PenaltyChart
						profileId={profile?.id}
						initialPtcp={profile?.voornaam}
						initialResults={initialPenaltyChart}
					/>
					{/* <div className="w-56 border-b-2 mt-3 mb-6 pl-2 pb-1 border-red-300/80 border-dashed text-red-300 text-sm">-9</div> */}
					
					
				{/* // Section 3: Barchart with all participants' chances and historic chances*/}

					<img src="/icons/molecule.png" className="icon-ph"/>
					<p>The points you retain form the <b>weights</b> in the sampling of two organizers.
						Divided by the total of remaining points across all participants, they return your sampling odds.
					</p>
					<p>In relation to the <b>other participants</b>, those odds look as follows. Change the trip edition to see historical data.</p>
						
					<BarChart
						profileId={profile?.id}
						initialYear={defaultYear}
						initialResults={initialBarChart}
					/>					
					
				{/* // Section 4: Simulation engine */}
					<img src="/icons/codeUser.png" className="icon-ph flex"/>
					<p>Curious to see how the drawing could pan out? Use the <b>simulator</b> below to draw organizers 
						multiple times and see how often you would be selected based on your chance.</p>
					<p>The drawing is based on the <b>Efraimidis–Spirakis A-Res algorithm</b>.
						It is made to mimic a weighted sampling without replacement, which is exactly what we need.</p>
					<p>In essence, it generates a <b>sort key</b> <b className="highlight tracking-widest">K<sub>i</sub></b> for each participant using the formula:</p>
					{/* <div className="text-center text-white font-semibold text-lg tracking-widest my-2 bg-red-100/50 rounded-full px-6 py-2 inline-block">
						K<sub>i</sub> = 100 * U<sub>i</sub><sup>1/p<sub>i</sub></sup> 
					</div> */}
					<div className="w-72 my-4 bg-white/30 p-4 rounded-2xl justify-items-center text-center">
						<div className="text-white pb-2 font-semibold border-b border-red-100/50 text-lg tracking-wider">K<sub>i</sub> = 100 * U<sub>i</sub><sup>1/p<sub>i</sub></sup></div>
						<p className="text-sm"><b className="highlight tracking-widest">U<sub>i</sub></b> is a uniform random number (0 to 1)</p>
						<p className="text-sm"><b className="highlight tracking-widest">p<sub>i</sub></b> is the probability of participant i.</p>
					</div>
					{/* <p className="text-sm"><b className="highlight tracking-widest">U<sub>i</sub></b> is a uniform random number (0 to 1)</p>
					<p className="text-sm"><b className="highlight tracking-widest">p<sub>i</sub></b> is the drawing probability of participant i.</p> */}
					<p>The two participants with the highest sort keys are selected. Therefore,
						participants with a low probability, thus a higher power exponent, need a high random number to bubble up to the top,  
						while participants with a high probability, have their lower power exponent working to their advantage.</p>
					{/* <p>A number between 0 and 1 to a low power has a greater chance to remain close to 1 (relatively large) than that same number to a higher power</p> */}
					<AResSimulation/>

				{/* // Section 5: Participant role */}

					<img src="/icons/dice2.png" className="icon-ph flex"/>
					<p>Below you can see what the algorithm has done this year and discover <b>your mission</b> for the next edition. It will be held in the weekend of
						<b className="highlight"> the 9<sup>th</sup> to the 11<sup>th</sup> of October</b>.</p>
					<p>If you are an organizer, the name of your coorganizer will appear. If not, the travler role will be shown.</p>
					
					<ToggleRole revealBelow={<div>{userRole[0].coorg.voornaam}</div>}>	

				{/* // Section 6: Organizer information */}
						{userRole[0].user_id == profile?.id ? (
							<>
								{/* <img src="/icons/lock.png" className="icon-ph flex mt-0 mb-4"/> */}
								{/* <div className="text-lg text-white w-72 mt-4 min-h-10 font-bold p-1 bg-emerald-500 border-2 border-white rounded-xl content-center text-center">
									auth_user: {userRole[0].user_id}, 
									org_users: {userRole[0].user_id} & {userRole[0].coorganizer_id}
								</div> */}
								<p>Dear {userRole[0].user.voornaam}, you have been selected to organize the <b>{defaultYear} edition of the Surprise Trip </b> 
									together with <b>{userRole[0].coorg.voornaam}</b>. Congratulations!
								</p>

								<p>To be successful, secret communication is key. Therefore access to the <b>surprise mailbox</b> has been transferred to you.</p>
								<img src="/icons/lock.png" className="icon-ph flex my-4"/>
								<p>A password reset has been performed for you already, so the credentials below are active and <b>only known to you</b>. 
									Please make sure to <b>securely store</b> the password, as this page might not be online throughout the year.</p>
								
								<div className="w-72 my-6 bg-white/30 p-4 rounded-2xl text-red-100 justify-items-center text-center">
									<div className="text-[15px]">surprisecommunications@proton.me</div>
									<div className="text-xl font-mono tracking-widest">2K@d3VcN1yN0E92Y</div>
								</div>

								<p>Two-factor authentication is disabled for the account. Please keep it that way to facilitate handover next year.
								</p>
								<p>The dates for this edition have already been set, so the only thing left to do is to prepare for yet another fantastic trip! <b>Good luck!</b></p>
							</>
							) : (
								null
							) 
						}
					</ToggleRole>

				{/* // Section 7: Organizer history */}

					<img src="/icons/hearts.png" className="icon-ph flex"/>
					<p>Feeling nostalgic? Below you find the <b>history of past trips</b> made since 2019.</p>

					<PastTrips
						initialYear={defaultYear-1}
						initialResults={initialTripHistory}
					/>

				{/* // Section 8: Log out	 */}
				
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
