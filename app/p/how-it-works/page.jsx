import {
  AgeRanges,
  AreasOfLearning,
  HowItWorks,
  KindiSkillsCategories,
  MonthlyThemes,
  PlayForLife,
  PopularActivity,
} from "@/app/Sections";
import { getHIWData, getHomeData } from "@/lib/hygraph";

export default async function HowItWorksPage() {
  const pageData = await getHIWData();
  const homeData = await getHomeData();

  if (!pageData || pageData.length === 0) {
    return <div>Not Found</div>;
  }
  if (!homeData || homeData.length === 0) {
    return <div>Not Found</div>;
  }
  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <PlayForLife fetchedData={pageData} />
        <HowItWorks homeData={homeData} />
        <AreasOfLearning fetchedData={pageData} />
        <KindiSkillsCategories fetchedData={pageData} />
        <AgeRanges fetchedData={pageData} />
        <MonthlyThemes homeData={homeData} />
        <PopularActivity homeData={homeData} />
      </section>
    </>
  );
}
