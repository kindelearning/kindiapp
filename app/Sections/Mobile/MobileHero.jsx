import React from "react";
import { WeeklyCalendar } from "..";
import { getAllActivities, getRandomActivities } from "@/lib/hygraph";

export default async function MobileHero() {
  const activitieData = await getRandomActivities();

  return (
    <>
      <section className="w-full md:h-full -mt-4 rounded-t-[12px] z-2 px-4 lg:h-auto bg-[#F5F5F5] pt-12 pb-4 items-start justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full flex flex-col justify-between md:items-center lg:flex-row px-0 md:px-2 lg:px-0 xl:flex-row gap-4 ">
          <h1 className="clarabodyTwo text-[#0A1932] w-full justify-start items-center text-start">
            Today&apos;s Activity
          </h1>
          {/* Activity Card */}
          <div className="flex w-full justify-between p-4 bg-white rounded-[24px]">
            <WeeklyCalendar activities={activitieData} />
          </div>
        </div>
      </section>
    </>
  );
}
