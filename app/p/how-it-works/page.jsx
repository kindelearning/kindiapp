import {
  AgeRanges,
  AreasOfLearning,
  Header,
  HowItWorks,
  KindiSkillsCategories,
  MonthlyThemes,
  PlayForLife,
  PopularActivity,
} from "@/app/Sections";

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <section className="w-full bg-[#EAEAF5] z-50 -mt-[4px] rounded-t-[16px] flex flex-col gap-0 justify-center items-start">
        <PlayForLife className="rounded-t-[12px]" />
        <HowItWorks />
        <AreasOfLearning />
        <KindiSkillsCategories />
        <AgeRanges />
        <MonthlyThemes />
        <PopularActivity />
      </section>
    </>
  );
}
// export default function HowItWorksPage() {
//   try {
//     return (
//       <>
//         <Header />
//         <section className="w-full bg-[#EAEAF5] z-50 -mt-[4px] rounded-t-[16px] flex flex-col gap-0 justify-center items-start">
//           <PlayForLife className="rounded-t-[12px]" />
//           <HowItWorks />
//           <AreasOfLearning />
//           <KindiSkillsCategories />
//           <AgeRanges />
//           <MonthlyThemes />
//           <PopularActivity />
//         </section>
//       </>
//     );
//   } catch (error) {
//     console.error("Error rendering HowItWorksPage:", error);
//     return <div>Error loading page</div>;
//   }
// }
