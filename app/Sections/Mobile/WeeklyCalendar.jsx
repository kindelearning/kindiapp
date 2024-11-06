"use client";

import { useState, useEffect } from "react"; //-

const WeeklyCalendar = () => {
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
    <div className="flex flex-col gap-2 w-full">
      {/* Row with Weekday Names */}
      <div className="flex w-full justify-between gap-2 bg-white rounded-full ">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div
            key={day}
            className="font-semibold w-full justify-center items-center text-center uppercase flex font-fredoka text-[#3F3A64] py-2 gap-0"
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
  );
};

export default WeeklyCalendar;
