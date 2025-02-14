'use client'

import { activities } from "@/app/constant/menu";
import {
  DiscoveringOurWorldActivity,
  ExperimentsMathActivity,
  KindiHeart,
  ReadingWritingActivity,
  SpeechLanguageActivity,
} from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import PopularActivityCarousel from "./PopularActivityCarousel";
import { useEffect, useState } from "react";

export default function PopularActivity({ homeData, activities }) {

  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/popularlearning?populate=Content.Media"
        );
        const data = await response.json();
        console.log("popularlearning Database", data);
        if (data?.data) {
          setContent(data.data.Content); // Set the fetched data
        } else {
          setError("No data found.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
 
  return (
    <>
      <section className="w-full h-auto bg-[#eaeaf5] pt-12 pb-20 items-center justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full script p-4 flex-col justify-start items-start md:items-center inline-flex">
          {content?.featuredText && (
            <div className="clarascript text-start md:text-center text-red">
              {content?.featuredText ||
                "Follow with your Child, Guided step-by-step"}
            </div>
          )}

          <div className="flex w-full heading justify-start items-start md:items-center md:justify-center flex-col">
            <div className="flex flex-wrap gap-1 text-start md:text-center justify-start items-start md:items-center md:justify-center w-full">
              <span className="claraheading text-start md:text-center text-purple">
                {content?.title
                  ? content?.title.split(" ").slice(0, 2).join(" ")
                  : "Popular Learning"}{" "}
              </span>
                {" "}
              <span className="claraheading text-red">
                {content?.title
                  ? content?.title.split(" ").slice(2, 3).join(" ")
                  : "Activities"}{" "}
              </span>
            </div>

            {content?.BodyDescription ? (
              <p
                className="prose w-full clarabodyTwo text-start md:text-center text-purple text-base md:text-lg lg:text-xl mt-4 leading-relaxed  animate-fadeIn animate-delay-2000"
                dangerouslySetInnerHTML={{ __html: content?.BodyDescription }}
              />
            ) : (
              <p>Discover the Joy of learning with Kindi</p>
            )}
          </div>
        </div>

        {/* <PopularActivityCarousel activities={filteredActivities} /> */}
        <PopularActivityCarousel />
      </section>
    </>
  );


  // return (
  //   <section className="w-full h-auto bg-[#eaeaf5] pt-12 pb-20 items-center justify-center flex flex-col gap-[20px]">
  //     {/* Top Heading Section */}
  //     <div className="claracontainer w-full script p-4 flex-col justify-start items-start md:items-center inline-flex">
  //       <h2 className="clarascript text-start md:text-center text-red">
  //         Follow with your Child, Guided step-by-step
  //       </h2>
  //       <div className="flex w-full heading justify-start items-start md:items-center md:justify-center flex-col">
  //         <div className="flex flex-wrap gap-1  text-start md:text-center justify-start items-start md:items-center md:justify-center  w-full">
  //           <span className="claraheading text-start md:text-center text-purple">
  //             Popular Learning
  //           </span>
  //           &nbsp;
  //           <span className="claraheading text-red">Activities</span>
  //         </div>
  //         <p className="clarabodyTwo text-start md:text-center text-purple">
  //           {/* Discover the Joy of Learning with Kindi! */}
  //           <p>{homeData[0].popularLearningActivities}</p>
  //         </p>
  //       </div>
  //     </div>
  //     {/* The Activity Carousel */}
  //     <PopularActivityCarousel activities={activities} />

  //     {/* <div className="flex overflow-x-auto py-2 scrollbar-hidden px-4 lg:px-0 w-full claracontainer gap-4 scrollbar-hidden">
  //       {activities.map((activity) => (
  //         <div key={activity.id}>
  //           <article className="rounded-lg ">
  //             <Link target="_blank" href={`/p/activities/${activity.id}`}>
  //               <div className="md:w-full hover:shadow-md duration-200 min-w-[200px] w-[200px] min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
  //                 <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
  //                   <div className="w-full max-w-[240px]  lg:max-w-full h-auto  ">
  //                     <div className="flex max-h-[180px] min-h-[150px] h-[150px] lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px]  overflow-clip rounded-t-3xl ">
  //                       <Image
  //                         width={280}
  //                         height={250}
  //                         alt={activity.title}
  //                         className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl "
  //                         src={activity.thumbnail.url}
  //                       />
  //                     </div>
  //                     <div className="w-full p-2 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
  //                       <div className="flex-col w-full gap-[6px] justify-start items-start">
  //                         <div className="text-[#0a1932] text-[12px]  md:text-[16px] font-semibold font-fredoka leading-[20px]">
  //                           {activity.title.length > 20
  //                             ? `${activity.title.slice(0, 18)}...`
  //                             : activity.title}
  //                         </div>
  //                         <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
  //                           <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex px-4 md:px-0 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
  //                             {activity.setUpTime}
  //                           </div>
  //                           <ul className="text-[#0a1932] justify-between items-center gap-6 flex px-4 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
  //                             {activity.skills
  //                               .slice(0, 2)
  //                               .map((skill, index) => (
  //                                 <li key={index}>{skill.slice(0, 8)}</li>
  //                               ))}
  //                           </ul>
  //                         </div>
  //                       </div>
  //                       <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
  //                         <Image
  //                           alt="Kindi"
  //                           className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
  //                           src={SpeechLanguageActivity}
  //                         />
  //                         <Image
  //                           alt="Kindi"
  //                           className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
  //                           src={DiscoveringOurWorldActivity}
  //                         />
  //                         <Image
  //                           alt="Kindi"
  //                           className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
  //                           src={ReadingWritingActivity}
  //                         />
  //                         <Image
  //                           alt="Kindi"
  //                           className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
  //                           src={ExperimentsMathActivity}
  //                         />
  //                         <div
  //                           className={`w-[20px] lg:w-[48px] lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
  //                         >
  //                           <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
  //                             +1
  //                           </span>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </Link>
  //           </article>
  //         </div>
  //       ))}
  //     </div> */}
  //   </section>
  // );
}
