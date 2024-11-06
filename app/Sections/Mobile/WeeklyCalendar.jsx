"use client";

import {
  DiscoveringOurWorldActivity,
  ExperimentsMathActivity,
  ReadingWritingActivity,
  SpeechLanguageActivity,
} from "@/public/Images";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"; //-

const WeeklyCalendar = ({ activities }) => {
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    // Calculate the start of the current week (Sunday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay);

    // Generate an array of dates for the week
    const dates = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day: date.getDate(), // Day of the month
        isToday: date.toDateString() === currentDate.toDateString(), // Check if it's today
      };
    });

    setWeekDates(dates);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Row with Weekday Names */}
      <div className="flex w-full flex-col gap-2 justify-between items-center">
        <div className="flex w-full justify-between gap-2 bg-white rounded-full ">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div
              key={day}
              className="font-semibold  w-[32px] h-[32px] justify-center items-center text-center uppercase flex font-fredoka text-[#3F3A64] py-2 gap-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Row with Week Dates */}
        <div className="flex w-full justify-between gap-2 bg-white rounded-full ">
          {weekDates.map((dateObj, index) => (
            <div
              key={index}
              className={`font-semibold w-[32px] h-[32px] justify-center items-center text-[12px] text-center flex font-fredoka py-2 gap-0 
                ${
                  dateObj.isToday ? "bg-red" : "bg-black"
                } text-white rounded-full`}
            >
              {dateObj.day}
            </div>
          ))}
        </div>
      </div>

      {/* The Activity Row */}
      <div className="lg:grid claracontainer overflow-y-hidden py-6 w-full flex flex-row overflow-x-scroll scrollbar-hidden gap-4 lg:grid-cols-2 xl:grid-cols-2">
        {activities.map((activity) => (
          <div key={activity.id} className="rounded-lg">
            <div className="md:w-full hover:shadow-md duration-200 min-w-[300px] w-[300px] min-h-[300px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col lg:flex-row gap-4">
              <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
                <div className="w-full max-w-[300px]  lg:max-w-full h-auto  ">
                  <div className="flex max-h-[240px] min-h-[240px] h-[240px] lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px]  overflow-clip rounded-t-2xl ">
                    <Image
                      width={280}
                      height={250}
                      alt={activity.title}
                      className="w-full max-h-[240px] min-h-[240px] h-[240px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-[16px] "
                      src={activity.thumbnail.url}
                    />
                  </div>
                  <div className="w-full p-2 py-4 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                    <div className="flex-col flex w-full gap-[6px] md:gap-3 justify-start items-start">
                      <div className="text-[#0a1932] text-[24px] font-semibold font-fredoka leading-[20px]">
                        {activity.title.length > 24
                          ? `${activity.title.slice(0, 22)}...`
                          : activity.title}
                      </div>
                      <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
                        <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex px-0 md:text-[18px] text-[14px] font-normal font-fredoka list-disc leading-none">
                          {activity.setUpTime}
                        </div>
                        <ul className="text-[#0a1932] justify-between items-center gap-6 flex px-4  md:text-[18px] text-[14px] font-normal font-fredoka list-disc leading-none">
                          {activity.skills.slice(0, 2).map((skill, index) => (
                            <li key={index}>{skill.slice(0, 8)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                      <Image
                        alt="Kindi"
                        className="w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
                        src={SpeechLanguageActivity}
                      />
                      <Image
                        alt="Kindi"
                        className="w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
                        src={DiscoveringOurWorldActivity}
                      />
                      <Image
                        alt="Kindi"
                        className="w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
                        src={ReadingWritingActivity}
                      />
                      <Image
                        alt="Kindi"
                        className="w-[32px] h-[32px] lg:w-[48px] lg:h-[48px]"
                        src={ExperimentsMathActivity}
                      />
                      <div
                        className={`w-[32px] lg:w-[48px] lg:h-[48px] h-[32px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
                      >
                        <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
                          +1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex -my-[20px] w-full end-0 justify-between pl-4 pr-2">
                <div />
                <Link
                  href={`/p/activities/${activity.id}`}
                  className="bg-red flex gap-2 px-4 items-center text-white clarabodyTwo rounded-[12px] py-2 font-bold text-[16px] border-2 "
                >
                  Lets Start 
                  <ChevronRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
