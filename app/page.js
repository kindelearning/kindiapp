import {
  Hero,
  HowItWorks,
  PromotionalSection,
  PromotionalSectionTwo,
  Slider,
} from "./Sections";

export default function Home() {
  return (
    <>
      <section className="w-full flex flex-col gap-0 justify-center items-center">
        <div className="w-full flex flex-col overflow-hidden gap-0">
          <Hero />
          <Slider />
          <PromotionalSection />
          <PromotionalSectionTwo />
          <HowItWorks />
        </div>
      </section>
    </>
  );
}
