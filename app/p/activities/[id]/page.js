import { getActivityById, getAllActivityIds } from "@/lib/hygraph";
import ActivityDetailClient from "../ActivityDetailClient";

// Use generateStaticParams in the App Router

export async function generateStaticParams() {
  const ids = await getAllActivityIds(); // Fetch dynamic IDs
  // console.log("Fetched Activity IDs:", ids); // Log fetched IDs

  return ids.map((id) => ({
    id: id.toString(), // Ensure ID is a string
  }));
}

export default async function ActivityDetailPage({ params }) {
  const { id } = params;

  // Fetch blog data on the server side
  const fetchedActivity = await getActivityById(id);

  if (!fetchedActivity) {
    return <div>Activity not found!</div>;
  }

  return <ActivityDetailClient activity={fetchedActivity} />;
}

// export default async function ActivityDetailPage({ params }) {
//   const { id } = params;
//   const activity = await getActivityById(id);

//   if (!activity) {
//     return (
//       <div>
//         <NotFound />
//       </div>
//     );
//   }

//   return (
//     <>
//       <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-0 px-0 flex flex-col md:flex-row gap-[20px]">
//         <div className="claracontainer p-0 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-8">
//           <div className="w-full hidden lg:flex text-[#3f3a64] claraheading capitalize">
//             {activity.title}
//           </div>
//           {/* Row 1 */}
//           <div className="claracontainer bg-[#ffffff] md:bg-[#ffffff] pb-4 lg:bg-[#eaeaf5] py-0 flex flex-col md:flex-col lg:flex-row xl:flow-row justify-between items-start gap-8">
//             {/* Col 1(R1) */}
//             <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
//               <ProductImages
//                 images={activity.activityImages.map((img) => img.url)}
//               />
//             </div>
//             {/* Col - 2(R1) */}
//             <div className="claracontainer w-full flex flex-col px-4 lg:px-0 justify-start items-start gap-4">
//               <div className="flex w-full flex-col justify-normal items-center gap-2">
//                 <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
//                   {activity.title}
//                 </div>
//                 <div className="items-center w-full justify-center flex flex-col gap-2">
//                   <ActivityAttribute
//                     image={ActivityBlack}
//                     features={activity.eventTimeline}
//                   />
//                   <ActivityAttribute
//                     image={TimerBlack}
//                     features={activity.setUpTime}
//                     title="Set up Time"
//                   />
//                   <ActivityAttribute
//                     image={Themes}
//                     className="text-[black]"
//                     features={activity.themeName}
//                     title="Theme"
//                   />
//                   <ActivityAttribute
//                     image={KidBlack}
//                     features={activity.focusAge}
//                     title="Focus age"
//                   />
//                 </div>
//               </div>
//               <div className="flex w-full flex-col justify-star items-start gap-2">
//                 <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
//                   Learning Areas
//                 </div>

//                 <div className="items-center overflow-x-scroll scrollbar-hidden w-full justify-start flex flex-row gap-1">
//                   {activityIcons.map(
//                     (item) =>
//                       activity[item.key] && (
//                         <IconBadge key={item.key} icon={item.icon} />
//                       )
//                   )}
//                 </div>
//               </div>
//               <div className="flex w-full flex-col justify-star items-start gap-2">
//                 <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
//                   Skills{" "}
//                 </div>
//                 <ul className="text-[#0a1932] px-4 text-[16px] font-normal font-fredoka list-disc leading-none">
//                   {activity.skills.map((skill, index) => (
//                     <li key={index}>{skill}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Row Two */}
//           <div className="claracontainer p-0 pb-24 flex flex-col md:flex-col lg:flex-row xl:flow-row justify-between items-start gap-8">
//             {/* Col 1(R2) */}
//             <div className="items-center px-4 lg:px-0 w-full lg:min-w-[600px] justify-center flex flex-col gap-2">
//               <div className="px-4 mb-6 md:hidden flex w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
//                 <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
//                   Activity resources{" "}
//                 </div>
//                 <Button className=" w-full flex md:hidden bg-[#3f3a64] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white">
//                   {" "}
//                   Resourses
//                 </Button>
//               </div>
//               <Accordian
//                 title={activity.accordionOne}
//                 description={activity.bodyOne}
//               />
//               <Accordian
//                 title={activity.accordionTwo}
//                 description={activity.bodyTwo}
//               />
//               <Accordian
//                 title={activity.accordionThree}
//                 description={activity.bodyThree}
//               />
//               <Accordian
//                 title={activity.accordionFour}
//                 description={activity.bodyFour}
//               />
//               <Accordian
//                 title={activity.accordionFive}
//                 description={activity.bodyFive}
//               />
//             </div>
//             {/* Col 2(R2) */}
//             <div className="flex w-full  flex-col py-6 md:py-0 justify-start items-start gap-2">
//               <div className="w-full md:flex hidden justify-between items-center p-6 bg-white rounded-xl shadow">
//                 <ChevronLeft />
//                 <div className="text-center text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
//                   Activity date <br />
//                   {new Date(activity.activityDate).toLocaleDateString()}
//                 </div>
//                 <ChevronRight />
//               </div>
//               <div className=" px-4 md:flex hidden w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
//                 <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
//                   Activity resources{" "}
//                 </div>
//                 <Button className=" w-full md:flex hidden bg-[#3f3a64] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white">
//                   {" "}
//                   Resourses
//                 </Button>
//               </div>
//               <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
//                 <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
//                   Print Activity{" "}
//                 </div>
//                 <Button
//                   onClick={handlePrint}
//                   className="w-full bg-[#3f3a64] text-white text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white"
//                 >
//                   {" "}
//                   Print{" "}
//                 </Button>
//               </div>
//               <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
//                 <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
//                   Mark Activity as Complete{" "}
//                 </div>
//                 <Button className="clarabutton bg-red flex gap-[4px] py-2 text-center text-white text-xs font-semibold font-fredoka rounded-2xl shadow border-2 border-white flex-row justify-center items-center w-full">
//                   Mark as Complete
//                 </Button>
//                 {/* <DynamicMarkActivityCompleteComponent activityId={id} /> */}
//               </div>
//             </div>
//           </div>
//           {/* Row 3(C1) */}

//           {/* Row 4(C1) */}
//           <div className="flex md:hidden z-50 shadow-upper pt-2 pb-4 px-2 mb-[72px] rounded-t-[8px] justify-between items-center gap-1 bg-[white] shadow-sm fixed bottom-0 left-0 w-full">
//             <Button
//               onClick={handlePrint}
//               className="flex bg-[#3f3a64] gap-[4px] py-2 text-center text-white text-xs font-semibold font-fredoka rounded-2xl shadow border-2 border-white flex-row justify-center items-center w-full"
//             >
//               <Image alt="Kindi" src={Print} />
//               Print
//             </Button>
//             <Button className="clarabutton bg-red flex gap-[4px] py-2 text-center text-white text-xs font-semibold font-fredoka rounded-2xl shadow border-2 border-white flex-row justify-center items-center w-full">
//               Mark as Complete
//             </Button>
//             {/* <DynamicMarkActivityCompleteComponent /> */}
//           </div>
//         </div>{" "}
//       </section>
//     </>
//   );
// }
