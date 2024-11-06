import { getAllActivities, getHomeData, getThemes } from "@/lib/hygraph";
import {
  BottomNavigation,
  Footer,
  Header,
  LocalHeader,
  MobileActivity,
  MobileCommunity,
  MobileHero,
  MobileProducts,
  MobileThemes,
  NewsLetter,
} from "./Sections";
import Image from "next/image";
import { KindiVector } from "@/public/Images";
import Link from "next/link";
import { Menu } from "lucide-react";

export default async function Home() {
  const homeData = await getHomeData();
  const activitieData = await getAllActivities();

  if (!homeData || homeData.length === 0) {
    return <div>Not Found</div>; // Handle the not found case
  }
  const themesData = await getThemes();

  return (
    <>
      <section className="w-full flex flex-col gap-0 justify-center items-center">
        {/* <Header className="sticky" /> */}
        <LocalHeader />
        <div className="w-full flex flex-col overflow-hidden gap-0">
          <MobileHero />
          <MobileThemes themes={themesData} homeData={homeData} />
          <MobileProducts />
          <MobileActivity activities={activitieData} homeData={homeData} />
          <MobileCommunity />
        </div>
        <NewsLetter />
        <BottomNavigation />
        <Footer />
      </section>
    </>
  );
}
