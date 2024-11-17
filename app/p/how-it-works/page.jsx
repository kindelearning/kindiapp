import {
  AgeRanges,
  AreasOfLearning,
  Header,
  HowItWorks,
  KindiSkillsCategories,
  LocalHeader,
  MonthlyThemes,
  PlayForLife,
  PopularActivity,
} from "@/app/Sections";
import NewHeader from "@/app/Sections/Mobile/NewHeader";
import {
  getAllActivities,
  getHIWData,
  getHomeData,
  getThemes,
} from "@/lib/hygraph";


export default async function HowItWorksPage() {
  try {
    const pageData = await getHIWData();
    const homeData = await getHomeData();
    const themesData = await getThemes();
    const activitieData = await getAllActivities();

    if (!pageData || pageData.length === 0) {
      return <div>Not Found</div>;
    }
    if (!homeData || homeData.length === 0) {
      return <div>Not Found</div>;
    }

    return (
      <>
      <Header headerText="Our Mission"/>

      <section className="w-full bg-[#EAEAF5] z-50  -mt-[8px] rounded-t-[16px] flex flex-col gap-0 justify-center items-start">
        <PlayForLife fetchedData={pageData} />
        <HowItWorks homeData={homeData} />
        <AreasOfLearning fetchedData={pageData} />
        <KindiSkillsCategories fetchedData={pageData} />
        <AgeRanges fetchedData={pageData} />
        <MonthlyThemes themes={themesData} homeData={homeData} />
        <PopularActivity activities={activitieData} homeData={homeData} />
      </section>
      </>
    );
  } catch (error) {
    console.error("Error rendering HowItWorksPage:", error);
    return <div>Error loading page</div>;
  }
}
