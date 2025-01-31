"use client";

import { User } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AgeRangeWidget from "./AgeRangeWidget";



export default function AgeRanges({ fetchedData }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/how-it-work-page?populate[AgeGroup][populate]=Content.Icon"
        );
        const data = await response.json();
        console.log("Age Group Data", data);
        if (data?.data) {
          setContent(data.data);
        } else {
          setError("No content found.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-gray-500">Loading content...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!content) return <div>No content available.</div>;

  const { AgeGroup } = content;
  const { featuredText, Title, Body, Content } = AgeGroup;

  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-0 xl:p-12 justify-start items-center lg:justify-center w-full flex flex-col overflow-hidden gap-8">
          {/* Top Heading Section */}
          <div className="claracontainer px-4 w-full py-6 flex-col justify-start items-center gap-1 inline-flex">
            <div className="text-start w-full md:text-center">
              <div>
                <span className="text-[#3f3a64] claraheading">
                  {Title.split(" ").slice(0, 3).join(" ") || "Kindi"}
                </span>{" "}
                <span className="text-red claraheading">
                  {/* {featuredText || " Age Ranges"} */}
                  {Title.split(" ").slice(2, 12).join(" ") || "Age Ranges"}
                </span>
              </div>
            </div>
            <div className="flex w-full justify-start items-start flex-col">
              <div className="w-full px-0 md:px-12 prose lg:px-32 text-start md:text-center text-[#3f3a64] clarbodyTwo">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      Body ||
                      "We created Kindi to empower both par with resources, you have everything you need to customize a unique learning path for your child amidst your other commitments.",
                  }}
                />
              </div>
            </div>
          </div>
          {/* Row Two */}
          <AgeRangeWidget />
        </div>
      </section>
    </>
  );
  // return (
  //   <>
  //     <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
  //       <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-0 xl:p-12 justify-start items-center lg:justify-center w-full flex flex-col overflow-hidden gap-8">
  //         {/* Top Heading Section */}
  //         <div className="claracontainer px-4 w-full py-6 flex-col justify-start items-center gap-1 inline-flex">
  //           <div className="text-start w-full md:text-center">
  //             <div>
  //               <span className="text-[#3f3a64] claraheading">
  //                 Flexible & Focused
  //               </span>
  //               <span className="text-red claraheading"> Age Ranges</span>
  //             </div>
  //           </div>
  //           <div className="flex w-full justify-start items-start flex-col">
  //             <div className="w-full px-0 md:px-12 lg:px-32 text-start md:text-center text-[#3f3a64] clarbodyTwo">
  //               {/* We understand that managing multiple learning activities for
  //               children of different ages can be challenging. That&apos;s why we&apos;ve
  //               developed a mixed-age approach to educational play. This
  //               approach delivers age-appropriate outcomes using the same proven
  //               activity, allowing your six-month-old baby to join in with your
  //               five-year-old and benefit from the same fun learning experience.
  //               Our platform provides guidance for adults on delivering
  //               different learning outcomes for each age group. While every
  //               activity is focused on a broad age range, there&apos;s always
  //               something to learn for every young child taking part! */}
  //               <p>{fetchedData[0].ageRanges}</p>
  //             </div>
  //           </div>
  //         </div>
  //         {/* Row Two */}
  //         <div className="w-full lg:max-w-[1180px] px-4 min-h-[400px] overflow-x-scroll scrollbar-hidden h-full py-6 flex-row justify-start items-center gap-[2px] flex ">
  //           <AgeCard
  //             image={AgeCardOne}
  //             bgImage="/Images/AgeRangeOne.svg"
  //             title="BABY (0+ YEARS)"
  //             body="Sensory play activities tailored for very young little ones, but appeal to all young children."
  //           />
  //           <Image
  //             src={AgeRangeArrow}
  //             alt="Kindi"
  //             className="w-[50px] h-[50px] -mx-3"
  //           />
  //           <AgeCard
  //             image={AgeCardTwo}
  //             bgImage="/Images/AgeRangeTwo.svg"
  //             body="Our learning activities help toddlers develop essential language, social, motor and cognitive skills — but babies and pre-schoolers can enjoy the fun, too!"
  //             title="TODDLER (18+ MONTHS)"
  //           />
  //           <Image
  //             src={AgeRangeArrow}
  //             alt="Kindi"
  //             className="w-[50px] h-[50px] -mx-3"
  //           />
  //           <AgeCard
  //             image={AgeCardThree}
  //             bgImage="/Images/AgeRangeThree.svg"
  //             body="Fun learning activities for children approaching the beginning of their school careers; these activities will also appeal to toddlers and babies."
  //             title="PRE-SCHOOLER (2.5+ YEARS)"
  //           />
  //           <Image
  //             src={AgeRangeArrow}
  //             alt="Kindi"
  //             className="w-[50px] h-[50px] -mx-3"
  //           />
  //           <AgeCard
  //             image={AgeCardFour}
  //             bgImage="/Images/AgeRangeFour.svg"
  //             title="KINDI (4+ YEARS)"
  //             body="Fun and engaging early years development activities for kindergarteners — Tailored developmental stages for toddlers, babies and pre-schoolers alike."
  //           />
  //         </div>
  //       </div>
  //     </section>
  //   </>
  // );
}
