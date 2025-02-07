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
      <div className="w-full -mt-[8px] z-50  rounded-t-[12px] pb-12 flex flex-col overflow-hidden gap-0">
        <MobileHero />
        <MobileThemes />
        <MobileActivity />
        <MobileCommunity />
        <MobileProducts />
      </div>
      <NewsLetter />
      <BottomNavigation />
      <Footer />
    </section>
  );
}
