import {
  DefaultReviews,
  MissionHero,
  OurStory,
  ParentWithKindi,
  PopularActivity,
  TheTeam,
} from "@/app/Sections";
import { getAllActivities, getHomeData, getStoryData } from "@/lib/hygraph";

export default async function OurMission() {
  const pageData = await getStoryData();
  const homeData = await getHomeData();
  const activitieData = await getAllActivities();

  if (!pageData || pageData.length === 0) {
    return <div>Not Found</div>; // Handle the not found case
  }
  return (
    <>
      <section className="w-full bg-[#ffffff] flex flex-col gap-0 justify-center items-center">
        <MissionHero fetchedData={pageData} />
        <OurStory fetchedData={pageData} />
        <TheTeam fetchedData={pageData} />
        <ParentWithKindi fetchedData={pageData} />
        <DefaultReviews />
        <PopularActivity activities={activitieData} homeData={homeData} />{" "}
      </section>
    </>
  );
}
