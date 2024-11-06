import { getAllActivities, getHomeData, getThemes } from "@/lib/hygraph";
import {
  MobileActivity,
  MobileCommunity,
  MobileHero,
  MobileProducts,
  MobileThemes,
} from "../Sections";

export default async function Home() {
  const homeData = await getHomeData();
  const themesData = await getThemes();
  const activitieData = await getAllActivities();

  if (!homeData || homeData.length === 0) {
    return <div>Data Not Found</div>; // Handle the not found case
  }
  return (
    <>
      <section className="w-full flex flex-col gap-0 justify-center items-center">
        <div className="w-full flex flex-col overflow-hidden gap-0">
          <MobileHero />
          <MobileThemes themes={themesData} homeData={homeData} />
          <MobileProducts />
          <MobileActivity activities={activitieData} homeData={homeData} />
          <MobileCommunity />
        </div>
      </section>
    </>
  );
}
