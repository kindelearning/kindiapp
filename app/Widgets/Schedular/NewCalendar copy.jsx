"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { KindiHeart, ThemeThumb } from "@/public/Images";
import Image from "next/image";
import { getIconForSkill } from "@/app/Sections/Activity/ActivityCard";

function CalendarNavigation({ currentDate, onPrevMonth, onNextMonth }) {
  const formattedDate = format(currentDate, "MMMM yyyy");
  return (
    <div className="flex font-fredoka items-center justify-center gap-2 mb-4">
      <button
        className="text-xl font-extrabold p-1 text-red border-red border-2 hover:scale-110 duration-200  rounded-md transition"
        onClick={onPrevMonth}
      >
        <ChevronLeft />
      </button>
      <span className="text-2xl text-purple  font-semibold">
        {formattedDate}
      </span>
      <button
        className="text-xl font-extrabold p-1 text-red border-red border-2 hover:scale-110 duration-200  rounded-md transition"
        onClick={onNextMonth}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

function YearMonthSelector({
  currentDate,
  availableYears,
  onYearChange,
  onMonthChange,
}) {
  return (
    <div className="flex items-center justify-end gap-2 mb-4">
      <select
        className="p-2 rounded-full"
        value={currentDate.getFullYear()}
        onChange={onYearChange}
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        className="p-2 rounded-full"
        value={currentDate.getMonth()}
        onChange={onMonthChange}
      >
        {[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}

function Weekdays() {
  return (
    <div className=" grid-cols-7 gap-2  w-full justify-between items-center px-16 pt-4 hidden uppercase lg:flex font-fredoka text-[#3F3A64] text-center font-semibold mb-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="py-2">
          {day}
        </div>
      ))}
    </div>
  );
}

function ActivityCard({ activityData }) {
  if (!activityData) return <p>No activity data available</p>;
  // const { FocusAge, SetUpTime, Skills, Theme } = activityData?.myActivity;

  return (
    <>
      <div className="flex flex-col p-2 bg-white rounded-md w-full gap-1 justify-between items-start">
        <div className="flex w-full justify-between gap-1 lg:gap-0 items-start">
          <div className="flex w-full py-1 flex-col justify-start items-start">
            <p className="font-semibold text-black text-[14px] leading-[16px] lg:text-[12px] lg:leading-[12px] text-start">
              {activityData?.myActivity?.Title || "Unknown Activity"}
            </p>
          </div>
          {/* Drag icon */}
          <div className="cursor-grab text-gray-500 items-start">
            <span className="text-xl flex items-start">⋮⋮</span>{" "}
          </div>
        </div>

        <div className="flex w-full gap-2 h-fit justify-between items-end">
          <div className="flex w-full  rounded-[4px]  max-w-[32px] object-cover h-[32px] overflow-clip">
            <Image
              //   src={event.Gallery[0].url} // Make sure this matches the actual property name
              src={ThemeThumb} // Make sure this matches the actual property name
              alt="ScheduleEvent"
              className="min-w-[32px] min-h-[32px] rounded-[4px] object-cover h-[32px]"
              width={32}
              height={32}
            />
          </div>

          <div className="flex w-full justify-between flex-col items-start">
            <div className="flex gap-1 items-center ">
              <div className="text-[#0a1932] text-start text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                {activityData?.myActivity?.FocusAge || "Toddles"}
              </div>
              <span className="flex items-center">•</span>
              <div className="text-[#0a1932] text-start text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                {activityData?.myActivity?.Theme || "Winter"}
              </div>
              <span className="flex items-center">•</span>
              <div className="text-[#0a1932] text-start lg:hidden text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
                {activityData?.myActivity?.SetUpTime || "5 min"}
              </div>
            </div>
            <div className="grid grid-cols-4 overflow-x-scroll gap-1 justify-between items-center  scrollbar-hidden">
              {Array.isArray(activityData?.myActivity?.LearningAreaIcons) &&
                activityData?.myActivity?.LearningAreaIcons.map(
                  (skill, index) => {
                    // Extract the skill title
                    const skillTitle = skill.children[0]?.text;
                    const icon = getIconForSkill(skillTitle); // Get the icon URL dynamically

                    // console.log("Icon fetched ", icon); // You can remove this in production
                    return (
                      <Image
                        key={index}
                        src={icon || KindiHeart} // Using the icon image URL here
                        alt={skillTitle}
                        width={20}
                        title={skillTitle}
                        height={20}
                        className="w-5 h-5 cursor-pointer text-opacity-50 hover:opacity-100 duration-150 ease-out" // Set the size for the image
                      />
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CalendarDay({
  date,
  currentDate,
  activitiesForThisDate,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
}) {
  return (
    <div
      key={date.toISOString()}
      className={`flex flex-col justify-between items-center p-2 relative py-2 bg-[#EaEaf5] border-[1.2px] border-[white] w-full rounded-md overflow-clip cursor-pointer gap-2 h-[140px] ${
        isSameMonth(date, currentDate)
          ? "bg-[#eaeaf5] text-gray-700 hover:bg-gray-200"
          : "bg-[#EaEaf5] text-[#8C8C8C] cursor-not-allowed"
      }`}
      onDrop={(event) => handleDrop(event, date)}
      onDragOver={handleDragOver}
      onTouchEnd={(event) => handleTouchEnd(event, date)}
    >
      <span className="flex w-full text-[#000000] justify-between text-xs font-semibold p-1 rounded-t-md">
        {format(date, "d")}
      </span>
      {activitiesForThisDate.map((activity) => (
        <div
          key={activity.id}
          draggable
          onDragStart={(event) => handleDragStart(event, activity)}
          onDragEnd={handleDragEnd}
          onTouchStart={(event) => handleTouchStart(event, activity)}
          onTouchMove={handleTouchMove}
          className="max-w-full text-white h-full w-full rounded-md cursor-pointer"
        >
          <ActivityCard activityData={activity} />
        </div>
      ))}
    </div>
  );
}

// function CalendarDay({
//   date,
//   currentDate,
//   activitiesForThisDate,
//   handleDrop,
//   handleDragStart,
//   handleDragEnd,
//   handleDragOver,
//   // We no longer attach onTouchEnd here since the draggable element will handle it.
//   handleTouchStart,
//   handleTouchMove,
//   // handleTouchEnd is removed from drop zone.
// }) {
//   return (
//     <div
//       data-date={date.toISOString()} // Add data attribute for drop target identification
//       key={date.toISOString()}
//       className={`flex flex-col justify-between items-center p-2 relative py-2 bg-[#EaEaf5] border-[1.2px] border-[white] w-full rounded-md overflow-clip cursor-pointer gap-2 h-[140px] ${
//         isSameMonth(date, currentDate)
//           ? "bg-[#eaeaf5] text-gray-700 hover:bg-gray-200"
//           : "bg-[#EaEaf5] text-[#8C8C8C] cursor-not-allowed"
//       }`}
//       onDrop={(event) => handleDrop(event, date)}
//       onDragOver={handleDragOver}
//     >
//       <span className="flex w-full text-[#000000] justify-between text-xs font-semibold p-1 rounded-t-md">
//         {format(date, "d")}
//       </span>
//       {activitiesForThisDate.map((activity) => (
//         <div
//           key={activity.id}
//           draggable
//           onDragStart={(event) => handleDragStart(event, activity)}
//           onDragEnd={handleDragEnd}
//           onTouchStart={(event) => handleTouchStart(event, activity)}
//           onTouchMove={(event) => handleTouchMove(event)}
//           // Attach the new touch end handler to the draggable element:
//           onTouchEnd={(event) => handleDraggableTouchEnd(event)}
//           className="max-w-full text-white h-full w-full rounded-md cursor-pointer"
//         >
//           <ActivityCard activityData={activity} />
//         </div>
//       ))}
//     </div>
//   );
// }

export default function NewCalendar({ activities }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [updatedActivities, setUpdatedActivities] = useState(activities);
  const touchStartPositionRef = useRef({ x: 0, y: 0 });
  const draggedActivityIdRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const availableYears = useMemo(
    () => Array.from({ length: 8 }, (_, index) => currentYear - 2 + index),
    [currentYear]
  );

  const calendarDays = useMemo(() => {
    const startOfMonthDate = startOfMonth(currentDate);
    const endOfMonthDate = endOfMonth(currentDate);
    const startOfCalendar = startOfWeek(startOfMonthDate);
    const endOfCalendar = endOfWeek(endOfMonthDate);
    return eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });
  }, [currentDate]);

  // Function to update an activity's date (shared by drop and touch end handlers)
  const updateActivityDate = useCallback(
    async (activityId, date) => {
      // Update local state
      const updatedList = updatedActivities.map((activity) =>
        activity.id === parseInt(activityId)
          ? { ...activity, newDate: format(date, "yyyy-MM-dd") }
          : activity
      );
      setUpdatedActivities(updatedList);

      const updatedEvent = updatedList.find(
        (activity) => activity.id === parseInt(activityId)
      );
      if (updatedEvent?.documentId) {
        const payload = {
          data: { newDate: format(date, "yyyy-MM-dd") },
        };

        try {
          const response = await fetch(
            `https://lionfish-app-98urn.ondigitalocean.app/api/rescheduled-events/${updatedEvent.documentId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          if (!response.ok) {
            const data = await response.json();
            console.error("Error updating event:", data);
          } else {
            console.log("Event updated successfully!");
          }
        } catch (error) {
          console.error("Error during API request:", error);
        }
      } else {
        console.error("No documentId found for the event.");
      }
    },
    [updatedActivities]
  );

  const handleDrop = useCallback(
    (event, date) => {
      event.preventDefault();
      const activityId = event.dataTransfer.getData("activityId");
      console.log("Dropped on date:", format(date, "yyyy-MM-dd"));
      updateActivityDate(activityId, date);
    },
    [updateActivityDate]
  );

  const handleDragStart = useCallback((event, activity) => {
    event.dataTransfer.setData("activityId", activity.id);
    event.target.style.opacity = 0.5;
  }, []);

  const handleDragEnd = useCallback((event) => {
    event.target.style.opacity = 1;
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleTouchStart = useCallback((event, activity) => {
    const touch = event.touches[0];
    event.target.style.opacity = 0.5;
    // Store the activity id in our ref
    draggedActivityIdRef.current = activity.id;
    touchStartPositionRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((event) => {
    const touch = event.touches[0];
    const dx = touch.clientX - touchStartPositionRef.current.x;
    const dy = touch.clientY - touchStartPositionRef.current.y;
    event.target.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  const handleTouchEnd = useCallback(
    async (event, date) => {
      // Reset styles on drop
      event.target.style.transform = "";
      event.target.style.opacity = 1;
      const activityId = draggedActivityIdRef.current;
      console.log(
        "Dropped on date:",
        format(date, "yyyy-MM-dd"),
        "for activity id:",
        activityId
      );
      if (activityId) {
        // Update the activity date using your existing updateActivityDate function
        updateActivityDate(activityId, date);
      } else {
        console.error("No activity id found in touch event.");
      }
      // Clear the ref after drop
      draggedActivityIdRef.current = null;
    },
    [updateActivityDate]
  );

  const getActivitiesForDate = useCallback(
    (date) => {
      const dateString = format(date, "yyyy-MM-dd");
      return updatedActivities.filter((activity) => {
        try {
          return (
            format(parseISO(activity.newDate), "yyyy-MM-dd") === dateString
          );
        } catch (error) {
          // In case newDate is missing or malformed
          return false;
        }
      });
    },
    [updatedActivities]
  );

  return (
    <div className="w-full max-w-full mx-auto my-6">
      <CalendarNavigation
        currentDate={currentDate}
        onPrevMonth={() => setCurrentDate(subMonths(currentDate, 1))}
        onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
      />
      <YearMonthSelector
        currentDate={currentDate}
        availableYears={availableYears}
        onYearChange={(e) =>
          setCurrentDate(new Date(e.target.value, currentDate.getMonth()))
        }
        onMonthChange={(e) =>
          setCurrentDate(new Date(currentDate.getFullYear(), e.target.value))
        }
      />
      <div className="flex w-full bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] flex-col">
        <Weekdays />
        <div className="flex-col flex lg:grid grid-cols-7 font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full gap-0 text-center">
          {calendarDays.map((date) => {
            const activitiesForThisDate = getActivitiesForDate(date);
            return (
              <CalendarDay
                key={date.toISOString()}
                date={date}
                currentDate={currentDate}
                activitiesForThisDate={activitiesForThisDate}
                handleDrop={handleDrop}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleDragOver={handleDragOver}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// export default function NewCalendar({ activities }) {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [updatedActivities, setUpdatedActivities] = useState(activities);
//   const touchStartPositionRef = useRef({ x: 0, y: 0 });
//   const draggedActivityIdRef = useRef(null);

//   const currentYear = new Date().getFullYear();
//   const availableYears = useMemo(
//     () => Array.from({ length: 8 }, (_, index) => currentYear - 2 + index),
//     [currentYear]
//   );

//   const calendarDays = useMemo(() => {
//     const startOfMonthDate = startOfMonth(currentDate);
//     const endOfMonthDate = endOfMonth(currentDate);
//     const startOfCalendar = startOfWeek(startOfMonthDate);
//     const endOfCalendar = endOfWeek(endOfMonthDate);
//     return eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });
//   }, [currentDate]);

//   // Function to update an activity's date (for both drop and touch drop)
//   const updateActivityDate = useCallback(
//     async (activityId, date) => {
//       const updatedList = updatedActivities.map((activity) =>
//         activity.id === parseInt(activityId)
//           ? { ...activity, newDate: format(date, "yyyy-MM-dd") }
//           : activity
//       );
//       setUpdatedActivities(updatedList);

//       const updatedEvent = updatedList.find(
//         (activity) => activity.id === parseInt(activityId)
//       );
//       if (updatedEvent?.documentId) {
//         const payload = { data: { newDate: format(date, "yyyy-MM-dd") } };
//         try {
//           const response = await fetch(
//             `https://lionfish-app-98urn.ondigitalocean.app/api/rescheduled-events/${updatedEvent.documentId}`,
//             {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(payload),
//             }
//           );
//           if (!response.ok) {
//             const data = await response.json();
//             console.error("Error updating event:", data);
//           } else {
//             console.log("Event updated successfully!");
//           }
//         } catch (error) {
//           console.error("Error during API request:", error);
//         }
//       } else {
//         console.error("No documentId found for the event.");
//       }
//     },
//     [updatedActivities]
//   );

//   const handleDrop = useCallback(
//     (event, date) => {
//       event.preventDefault();
//       const activityId = event.dataTransfer.getData("activityId");
//       console.log("Dropped on date:", format(date, "yyyy-MM-dd"));
//       updateActivityDate(activityId, date);
//     },
//     [updateActivityDate]
//   );

//   const handleDragStart = useCallback((event, activity) => {
//     event.dataTransfer.setData("activityId", activity.id);
//     event.target.style.opacity = 0.5;
//   }, []);

//   const handleDragEnd = useCallback((event) => {
//     event.target.style.opacity = 1;
//   }, []);

//   const handleDragOver = useCallback((event) => {
//     event.preventDefault();
//   }, []);

//   // --- Touch Handlers for Mobile ---
//   const handleTouchStart = useCallback((event, activity) => {
//     const touch = event.touches[0];
//     event.target.style.opacity = 0.5;
//     // Store the activity id in our ref
//     draggedActivityIdRef.current = activity.id;
//     touchStartPositionRef.current = { x: touch.clientX, y: touch.clientY };
//   }, []);

//   const handleTouchMove = useCallback((event) => {
//     const touch = event.touches[0];
//     const dx = touch.clientX - touchStartPositionRef.current.x;
//     const dy = touch.clientY - touchStartPositionRef.current.y;
//     event.target.style.transform = `translate(${dx}px, ${dy}px)`;
//   }, []);

//   // New handler for touch end on the draggable element
//   const handleDraggableTouchEnd = useCallback(
//     async (event) => {
//       // Reset draggable element styles
//       event.target.style.transform = "";
//       event.target.style.opacity = 1;
//       const touch = event.changedTouches[0];
//       // Determine the drop target element at the touch end coordinates
//       const dropElem = document.elementFromPoint(touch.clientX, touch.clientY);
//       // Look for the closest CalendarDay element (using the data-date attribute)
//       const dropZone = dropElem?.closest("[data-date]");
//       if (dropZone) {
//         const dateString = dropZone.getAttribute("data-date");
//         if (dateString) {
//           const dropDate = new Date(dateString);
//           const activityId = draggedActivityIdRef.current;
//           console.log(
//             "Dropped on date:",
//             format(dropDate, "yyyy-MM-dd"),
//             "for activity id:",
//             activityId
//           );
//           if (activityId) {
//             await updateActivityDate(activityId, dropDate);
//           } else {
//             console.error("No activity id found in touch event.");
//           }
//         } else {
//           console.error("Drop zone does not have a valid date attribute.");
//         }
//       } else {
//         console.error("No valid drop zone found at touch end.");
//       }
//       // Clear the ref after drop
//       draggedActivityIdRef.current = null;
//     },
//     [updateActivityDate]
//   );

//   const getActivitiesForDate = useCallback(
//     (date) => {
//       const dateString = format(date, "yyyy-MM-dd");
//       return updatedActivities.filter((activity) => {
//         try {
//           return (
//             format(parseISO(activity.newDate), "yyyy-MM-dd") === dateString
//           );
//         } catch (error) {
//           // In case newDate is missing or malformed, ignore the activity
//           return false;
//         }
//       });
//     },
//     [updatedActivities]
//   );

//   return (
//     <div className="w-full max-w-full mx-auto my-6">
//       <CalendarNavigation
//         currentDate={currentDate}
//         onPrevMonth={() => setCurrentDate(subMonths(currentDate, 1))}
//         onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
//       />
//       <YearMonthSelector
//         currentDate={currentDate}
//         availableYears={availableYears}
//         onYearChange={(e) =>
//           setCurrentDate(new Date(e.target.value, currentDate.getMonth()))
//         }
//         onMonthChange={(e) =>
//           setCurrentDate(new Date(currentDate.getFullYear(), e.target.value))
//         }
//       />
//       <div className="flex w-full bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] flex-col">
//         <Weekdays />
//         <div className="flex-col flex lg:grid grid-cols-7 font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full gap-0 text-center">
//           {calendarDays.map((date) => {
//             const activitiesForThisDate = getActivitiesForDate(date);
//             return (
//               <CalendarDay
//                 key={date.toISOString()}
//                 date={date}
//                 currentDate={currentDate}
//                 activitiesForThisDate={activitiesForThisDate}
//                 handleDrop={handleDrop}
//                 handleDragStart={handleDragStart}
//                 handleDragEnd={handleDragEnd}
//                 handleDragOver={handleDragOver}
//                 handleTouchStart={handleTouchStart}
//                 handleTouchMove={handleTouchMove}
//                 // Note: We removed onTouchEnd here; it is handled on the draggable element.
//                 // handleTouchEnd={handleTouchEnd}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
