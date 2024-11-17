import {
  DefaultReviews,
  MissionHero,
  OurStory,
  ParentWithKindi,
  PopularActivity,
  TheTeam,
} from "@/app/Sections";
import NewHeader from "@/app/Sections/Mobile/NewHeader";
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
      <NewHeader headerText="Our Mission" />

      <section className="w-full bg-[#ffffff] -mt-[8px] rounded-t-[16px]  z-50  flex flex-col gap-0 justify-center items-center">
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
