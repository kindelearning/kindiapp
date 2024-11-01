import { getHomeData } from "@/lib/hygraph";
import {
  BottomNavigation,
  DefaultReviews,
  Footer,
  Header,
  Hero,
  HowItWorks,
  MonthlyThemes,
  NewsLetter,
  OurPricing,
  PopularActivity,
  PromotionalSection,
  PromotionalSectionTwo,
  Slider,
} from "../Sections";
// import {
//   BottomNavigation,
//   DefaultReviews,
//   Footer,
//   Header,
//   Hero,
//   HowItWorks,
//   MonthlyThemes,
//   NewsLetter,
//   OurPricing,
//   PopularActivity,
//   PromotionalSection,
//   PromotionalSectionTwo,
//   Slider,
// } from "../Sections";

export default async function Home() {
  const homeData = await getHomeData();

  if (!homeData || homeData.length === 0) {
    return <div>Data Not Found</div>; // Handle the not found case
  }
  return (
    <>
      <section className="w-full flex flex-col gap-0 justify-center items-center">
        <div className="w-full flex flex-col overflow-hidden gap-0">
          <Hero homeData={homeData} />
          <Slider />
          <PromotionalSection homeData={homeData} />
          <PromotionalSectionTwo homeData={homeData} />
          <HowItWorks homeData={homeData} />
          <MonthlyThemes homeData={homeData} />
          <PopularActivity homeData={homeData} />
          <DefaultReviews />
          <OurPricing homeData={homeData} />
        </div>
      </section>
    </>
  );
}
