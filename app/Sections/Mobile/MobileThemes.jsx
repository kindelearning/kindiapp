import { ThemeCard } from "@/app/Widgets";
import Link from "next/link";
import React from "react";

export default function MobileThemes({ homeData, themes }) {
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

          <div className="lg:grid claracontainer w-full flex pl-4 flex-row overflow-x-scroll scrollbar-hidden hover:px-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                image={theme.thumbnail.url}
                theTime={theme.launchTime}
                metaDesc={theme.metaDesc}
                title={theme.title}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
