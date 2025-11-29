import userDataFetch from "./getUser";
import userChanceFetch from "./getChance";
import userChancesFetch from "./getChances";
import ToggleRole from "./toggleRole";

export default async function DashboardPage() {
	const { user, profile, nameToShow } = await userDataFetch();
	const { drawChance } = await userChanceFetch(); 
	const drawChances = await userChancesFetch();

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
					
					<img src="/icons/surfboard.svg" className="icon-ph"/>
					<p>In relation to the <b>other participants</b>, your odds look as follows. Change the trip edition to see historical data</p>
						

					<div className="w-72 my-6 bg-white/30 p-4 rounded-2xl">

						<form className="text-white text-center text-sm font-bold mb-5">
							<select name="edition" className="p-1 rounded-lg bg-white/30 text-red-100 font-medium">
								<option value="2026" selected>2026</option>
								<option value="2025">2025</option>
								<option value="2024">2024</option>
								<option value="2023">2023</option>
								<option value="2022">2022</option>
							</select>
						</form>

						{drawChances.map((item, index) => (
							<div className="flex text-sm mt-2 mb-1.5">
								<span key="item.user_id" className="w-14 pr-2 text-xs text-white text-right">{item.users.voornaam}</span>
								<div className="h-4 flex-full flex w-48 rounded-full bg-red-100 text-red-900">
									<div 
										style={{ width: `${12 + 6*item.kans_d}%` }}
										className={`${item.user_id == profile?.id ? 'bg-red-500 text-white' : 'bg-red-200'} hover:bg-red-400 active:bg-red-400 hover:text-white h-4 pr-px rounded-l-full text-xs text-right`}>
											{item.kans_d}
									</div>
									<div className="h-4 ml-px text-xs">%</div>
								</div>
							</div>
						))}
					</div>
					

					<img src="/icons/dice.png" className="icon-ph flex"/>
					<p>Your role for the next trip will appear here.</p>
					
					<ToggleRole>
						Traveler
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
