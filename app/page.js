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

export default function Home() {
  return (
    <section className="w-full flex flex-col gap-0 justify-center items-center">
      <LocalHeader />
      <div className="w-full -mt-[8px]  rounded-t-[12px] pb-12 flex flex-col overflow-hidden gap-0">
        <MobileHero />
        <MobileActivity />
        <MobileProducts />
        <MobileThemes />
        <MobileCommunity />
      </div>
      <NewsLetter />
      <BottomNavigation />
      <Footer />
    </section>
  );
}
