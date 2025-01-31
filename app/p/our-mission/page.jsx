import {
  DefaultReviews,
  MissionHero,
  OurStory,
  ParentWithKindi,
  PopularActivity,
  TheTeam,
} from "@/app/Sections";
import NewHeader from "@/app/Sections/Mobile/NewHeader";

export default function OurMission() {
  return (
    <>
      <NewHeader headerText="Our Mission" />
      <section className="w-full bg-[#ffffff] -mt-[8px] rounded-t-[16px]  z-50  flex flex-col gap-0 justify-center items-center">
        <MissionHero />
        <OurStory />
        <ParentWithKindi />
        <TheTeam />
        <DefaultReviews />
        <PopularActivity />
      </section>
    </>
  );
}
