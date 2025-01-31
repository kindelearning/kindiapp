"use client";

import { ThemeCard } from "@/app/Widgets";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeGrid from "./ThemeGrid";

export default function MonthlyThemes({ homeData, themes }) {
  const [content, setContent] = useState(null); // To store the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/Monthlytheme?populate=Content.Media"
        );
        const data = await response.json();
        // console.log("Monthlytheme Database", data);
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

  if (!content) {
    return <p>No data available</p>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  return (
    <>
      <section className="w-full h-auto bg-[#F3BD40] items-center justify-center py-12 flex transition-all animate-fade-in  duration-300 flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex-col justify-start items-center script inline-flex">
          {content.featuredText && (
            <div className="w-full claracontainer animate-fade-in px-4 duration-150 text-start  md:text-center text-[#eaeaf5] clarascript">
              {content.featuredText ||
                "Enjoy every Precious Moment with your Children"}
            </div>
          )}
          <div className="w-auto  flex-col justify-center items-center px-4 heading inline-flex">
            <div className="w-full text-start md:text-center">
              <span className="text-[#3f3a64] claraheading animate-fade-in  duration-150">
                {content.title
                  ? content.title.split(" ").slice(0, 2).join(" ")
                  : "This Months"}{" "}
              </span>
              <br />
              <span className="text-[#ffffff] claraheading animate-fade-in  duration-150">
                {content.title
                  ? content.title.split(" ").slice(3, 12).join(" ")
                  : "Learning Themes"}{" "}
              </span>
            </div>
            {content.BodyDescription ? (
              <p
                className="prose w-full md:w-[500px] xl:w-[800px] animate-fade-in  duration-150 text-start md:text-center text-purple clarabodyTwo"
                dangerouslySetInnerHTML={{
                  __html: content.BodyDescription,
                }}
              />
            ) : (
              <p>
                Providing themes for each activity is a powerful way to keep
                children engaged in learning; we use it to both maintain
                involvement and reinforce the previous day&apos;s learnings.
                That&apos;s why we release new themes every month.
              </p>
            )}
          </div>

          <ThemeGrid />
        </div>
      </section>
    </>
  );
  // return (
  //   <>
  //     <section className="w-full h-auto bg-[#F3BD40] items-center justify-center py-4 flex transition-all animate-fade-in  duration-300 flex-col md:flex-row gap-[20px]">
  //       <div className="claracontainer w-full flex-col justify-start items-center script inline-flex">
  //         <div className="w-full claracontainer animate-fade-in px-4 duration-150 text-start  md:text-center text-[#eaeaf5] clarascript">
  //           Enjoy every Precious Moment with your Children
  //         </div>
  //         <div className="w-auto  flex-col justify-center items-center px-4 heading inline-flex">
  //           <div className="w-full text-start md:text-center">
  //             <span className="text-[#3f3a64] claraheading animate-fade-in  duration-150">
  //               This Month&apos;s{" "}
  //             </span>
  //             <br />
  //             <span className="text-[#ffffff] claraheading animate-fade-in  duration-150">
  //               Early Learning Themes
  //             </span>
  //           </div>
  //           <div className="w-full md:w-[500px] xl:w-[800px] animate-fade-in  duration-150 text-start md:text-center text-purple clarabodyTwo">
  //             <p>{homeData[0].monthlyTheme}</p>
  //           </div>
  //         </div>

  //         <div className="lg:grid claracontainer w-full flex flex-row overflow-x-scroll scrollbar-hidden px-2 py-4 hover:px-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
  //           {themes.map((theme) => (
  //             <Link href={`/p/our-themes/${theme.id}`} key={theme.id}>
  //               <ThemeCard
  //                 key={theme.id}
  //                 image={theme.thumbnail.url}
  //                 theTime={theme.launchTime}
  //                 metaDesc={theme.metaDesc}
  //                 title={theme.title}
  //               />
  //             </Link>
  //           ))}
  //         </div>
  //         {themes.length > 4 ? (
  //           <div className="w-full flex-col justify-center items-center px-4 heading inline-flex">
  //             <Link
  //               href="/p/our-themes"
  //               className="clarabutton text-white py-2 min-w-[200px] lg:w-[240px] text-center px-8 lg:px-4  bg-red hover:bg-purple"
  //             >
  //               View More
  //             </Link>
  //           </div>
  //         ) : null}
  //       </div>
  //     </section>
  //   </>
  // );
}
