
import userDataFetch from "../dashboard/getUser";
import userChancesFetch from "../dashboard/getChances";
import YearFilter from "../dashboard/barChart";

export default async function Page() {

	const { profile } = await userDataFetch();
  const defaultYear = 2026;
  const initialResults = await userChancesFetch(defaultYear);

  return (
    <div>
      <YearFilter 
        profileId={profile?.id}
        initialYear={defaultYear}
        initialResults={initialResults}
      />
      <div className="bg-white w-120 h-120 text-[300px] text-center content-center">
        🧮
      </div>
    </div>
		
  )
}

