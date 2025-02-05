"use client";

import { ThemeCard } from "@/app/Widgets";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function MobileThemes({}) {
  const [themes, setThemes] = useState([]); // Store all themes
  const [currentPage, setCurrentPage] = useState(1);
  const [currentThemes, setCurrentThemes] = useState([]); // Store themes for the current page

  const fetchThemes = async () => {
    try {
      const res = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/our-themes?populate=*"
      );
      const data = await res.json();

      if (data && data.data) {
        setThemes(data.data); // Save all themes
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchThemes(); // Fetch all themes once
  }, []);

  useEffect(() => {
    // Paginate the themes
    const start = (currentPage - 1) * 12;
    const end = start + 12;
    setCurrentThemes(themes.slice(start, end)); // Get the themes for the current page
  }, [themes, currentPage]);



  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] items-center justify-center py-4 flex transition-all animate-fade-in  duration-300 flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex-col justify-start gap-4 items-center script inline-flex">
          <div className="flex justify-between px-4  items-center w-full">
            <h1 className="clarabodyTwo text-[#0A1932] w-full justify-start items-center text-start">
              Upcoming Theme
            </h1>
            <Link
              href="/p/our-themes"
              className="clarabodyTwo text-red min-w-[max-content] justify-start items-center text-start"
            >
              View All
            </Link>
          </div>

          <div className="claracontainer w-full ">
            {themes.length === 0 ? (
              <div>Loading...</div> // Loading state
            ) : (
              <div className="lg:grid claracontainer w-full flex pl-4 flex-row overflow-x-scroll scrollbar-hidden px-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
                {currentThemes.map((item) => (
                  <Link
                    key={item.id}
                    target="_blank"
                    href={`/p/our-themes/${item.documentId}`}
                  >
                    <article className="rounded-lg">
                      <ThemeCard
                        schedulesDate={item?.LaunchTime || "2024-12-25"} // Fallback for LaunchTime
                        image={
                          item?.Thumbnail
                            ? `https://lionfish-app-98urn.ondigitalocean.app${item?.Thumbnail[0]?.url}`
                            : "/Images/ThemeDummy.png"
                        } // Fallback for image URL
                        // src={`https://lionfish-app-98urn.ondigitalocean.app${image}` || "/Images/ThemeDummy.png"}

                        description={
                          item?.metaDesc
                            ? item.metaDesc.slice(0, 100)
                            : "No description available"
                        } // Fallback for metaDesc
                        header={item?.Title || "Untitled"} // Fallback for Title
                      />
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
