import {
  AgeRanges,
  AreasOfLearning,
  HowItWorks,
  KindiSkillsCategories,
  MonthlyThemes,
  PlayForLife,
  PopularActivity,
} from "@/app/Sections";

export default function HowItWorksPage() {
  return (
    <>
      <section className="w-full bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <PlayForLife />
        <HowItWorks />
        <AreasOfLearning />
        <KindiSkillsCategories />
        <AgeRanges />
        {/* 
         */}
        <MonthlyThemes />
        <PopularActivity />
      </section>
    </>
  );
}
