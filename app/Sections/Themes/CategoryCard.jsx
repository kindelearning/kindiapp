"use client";
import React, { useEffect, useState } from "react";
import { ThemeDummy } from "@/public/Images";

export  function ThemeTimer({ targetDate = "2024-10-31" }) {
  const calculateRemainingTime = () => {
    const targetTime = new Date(targetDate).getTime(); // Convert target date to milliseconds
    const now = Date.now(); // Current time in milliseconds
    const remainingTime = targetTime - now; // Calculate remaining time in milliseconds

    // If time has passed, return 0
    return remainingTime > 0 ? remainingTime : 0;
  };

  const formatTime = (totalMilliseconds) => {
    if (totalMilliseconds <= 0) return "00d 00:00:00";

    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId); // Stop the timer
          return 0; // Ensure it doesn't go below zero
        }
        return calculateRemainingTime(); // Update remaining time
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [targetDate]); // Depend on targetDate to recalculate when it changes

  return (
    <div className="w-auto max-w-[340px] h-auto bg-red rounded-full px-[16px] flex gap-[8px] items-center justify-between">
      <div className="w-auto h-[34px] flex gap-[12px] justify-between items-center">
        <div className="w-[max-content] text-white text-[12px] md:text-[16px] font-normal font-fredoka leading-[28px]">
          Adventure Countdown:
        </div>
        <div className="w-[max-content] font-fredoka text-right text-white text-[12px] md:text-[18px] font-semibold leading-[32px]">
          {formatTime(remainingTime)}
        </div>
      </div>
    </div>
  );
}

const CategoryCard = ({
  image,
  schedulesDate,
  header = "Winter Magic",
  description = "Snow adventure, ice castles, cozy indoor playtimes",
}) => {
  return (
    <div className="flex cursor-pointer flex-col justify-end relative">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex rounded-t-lg  overflow-clip">
          <img
            width={400}
            height={300}
            src={image || ThemeDummy}
            // src={`https://lionfish-app-98urn.ondigitalocean.app${image}` || "/Images/ThemeDummy.png"}
            alt="Category Image"
            className="w-full hover:scale-110  duration-500 ease-out h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-between py-2 flex-col w-full items-start">
              <h2 className="text-[#3f3a64] text-2xl font-semibold font-fredoka leading-tight">
                {header}
              </h2>

              <p className="text-[#0a1932] min-h-[60px] max-h-[60px] text-[16px] font-normal font-fredoka leading-[20px]">
                {description.length > 100
                  ? description.slice(0, 99) + "..."
                  : description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="-mt-4 flex justify-end mr-2 z-12 animate-fade-in">
        <ThemeTimer targetDate={schedulesDate} />
      </div> */}
      <div className="-mt-4 flex justify-end mr-2 z-12 animate-fade-in">
        {new Date(schedulesDate).getTime() > Date.now() ? (
          <ThemeTimer targetDate={schedulesDate} />
        ) : (
          // <span className="text-red font-semibold">Explore Theme</span>
          <div className="w-auto hover:scale-110 duration-500 ease-out max-w-[340px] h-auto bg-purple rounded-full px-[16px] flex gap-[8px] items-center justify-between">
            <div className="w-auto h-[34px] flex gap-[12px] justify-between items-center">
              <div className="w-[max-content] font-semibold text-white text-[12px] md:text-[16px] font-fredoka leading-[28px]">
                Explore Theme
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
