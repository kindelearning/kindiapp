import {
  getAllActivities,
  getHomeData,
  getThemes,
} from "@/lib/hygraph";
import {
  BottomNavigation,
  Footer,
  LocalHeader,
  MobileActivity,
  MobileCommunity,
  MobileHero,
  MobileProducts,
  MobileThemes,
  NewsLetter,
} from "./Sections";

export default async function Home() {
  const homeData = await getHomeData();
  // const activitieData = await getAllActivities();

  if (!homeData || homeData.length === 0) {
    return <div>Not Found</div>; // Handle the not found case
  }
  const themesData = await getThemes();

  return (
    <>
      <section className="w-full flex flex-col gap-0 justify-center items-center">
        {/* <Header className="sticky" /> */}
        <LocalHeader />
        <div className="w-full -mt-[8px] z-50 rounded-t-[12px] pb-12 flex flex-col overflow-hidden gap-0">
          <MobileHero />
          {/* <MobileActivity activities={activitieData} homeData={homeData} /> */}
          {/* <MobileProducts /> */}
          {/* <MobileThemes themes={themesData} homeData={homeData} /> */}
          <MobileCommunity />
        </div>
        <NewsLetter />
        <BottomNavigation />
        <Footer />
      </section>
    </>
  );
}
