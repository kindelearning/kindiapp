import {
  DefaultReviews,
  MissionHero,
  OurStory,
  ParentWithKindi,
  PopularActivity,
  TheTeam,
} from "@/app/Sections";

export default function OurMission() {
  return (
    <>
      <section className="w-full bg-[#ffffff] flex flex-col gap-0 justify-center items-center">
        <MissionHero />
        <OurStory />
        <TheTeam />
        <ParentWithKindi />
        <DefaultReviews />
        <PopularActivity />
      </section>
    </>
  );
}
