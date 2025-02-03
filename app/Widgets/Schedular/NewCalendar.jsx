"use client";
import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { KindiHeart, ThemeThumb } from "@/public/Images";
import Image from "next/image";
// import { getIconForSkill } from "./ActivityCard";
import Link from "next/link";
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
}) {
  return (
    <div
      key={date}
      className={`flex flex-col justify-between items-center p-2  relative py-2 bg-[#EaEaf5] border-[1.2px] border-[white] w-full rounded-md overflow-clip cursor-pointer gap-2 h-[140px] ${
        isSameMonth(date, currentDate)
          ? "bg-[#eaeaf5] text-gray-700 hover:bg-gray-200  "
          : "bg-[#EaEaf5] text-[#8C8C8C] cursor-not-allowed"
      }`}
      onDrop={(event) => handleDrop(event, date)}
      onDragOver={handleDragOver}
    >
      <span className=" flex w-full text-[#000000] justify-between left-0 right-0 text-xs font-semibold p-1 rounded-t-md">
        {format(date, "d")}
      </span>

      {activitiesForThisDate.map((activity) => (
        <div
          key={activity.id}
          draggable
          onDragStart={(event) => handleDragStart(event, activity)}
          onDragEnd={handleDragEnd}
          className="max-w-full text-white h-full w-full rounded-md cursor-pointer"
        >
          <ActivityCard activityData={activity} />
        </div>
      ))}
    </div>
  );
}

export default function NewCalendar({ activities }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [updatedActivities, setUpdatedActivities] = useState(activities);

  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: 8 },
    (_, index) => currentYear - 2 + index
  );

  const getCalendarDays = (date) => {
    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);
    const startOfCalendar = startOfWeek(startOfMonthDate);
    const endOfCalendar = endOfWeek(endOfMonthDate);

    return eachDayOfInterval({
      start: startOfCalendar,
      end: endOfCalendar,
    });
  };

  const handleDrop = async (event, date) => {
    event.preventDefault();
    const activityId = event.dataTransfer.getData("activityId");

    // Log the dropped date to the console
    console.log("Dropped on date: ", format(date, "yyyy-MM-dd"));

    // Find the activity that was dragged and update its date
    const updatedActivitiesList = updatedActivities.map((activity) =>
      activity.id === parseInt(activityId)
        ? { ...activity, newDate: format(date, "yyyy-MM-dd") }
        : activity
    );

    setUpdatedActivities(updatedActivitiesList);

    // Get the updated event with the documentId
    const updatedEvent = updatedActivitiesList.find(
      (activity) => activity.id === parseInt(activityId)
    );

    // Check if documentId exists
    if (updatedEvent.documentId) {
      const payload = {
        data: {
          newDate: format(date, "yyyy-MM-dd"),
        },
      };

      // Log the payload to check if it's in the right format
      console.log("Payload to send:", payload);

      try {
        // Send the PUT request using the documentId
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/rescheduled-events/${updatedEvent.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        // Check for successful response
        if (response.ok) {
          console.log("Event updated successfully!");
        } else {
          // Log response if there's an error
          const data = await response.json();
          console.error("Error updating event:", data);
        }
      } catch (error) {
        console.error("Error during API request:", error);
      }
    } else {
      console.error("No documentId found for the event.");
    }
  };

  const getActivitiesForDate = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return updatedActivities.filter((activity) => {
      return format(parseISO(activity.newDate), "yyyy-MM-dd") === dateString;
    });
  };

  // For Mouse Drag Events
  const handleDragStart = (event, activity) => {
    event.dataTransfer.setData("activityId", activity.id);
    event.target.style.opacity = 0.5;
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = 1;
  };

  // For Mobile Touch Events
  const handleTouchStart = (event, activity) => {
    const touch = event.touches[0];
    event.target.style.opacity = 0.5;
    event.dataTransfer.setData("activityId", activity.id);
    touchStartPosition = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const dragElement = event.target;
    const dx = touch.clientX - touchStartPosition.x;
    const dy = touch.clientY - touchStartPosition.y;
    dragElement.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleTouchEnd = async (event, date) => {
    const touch = event.changedTouches[0];
    const activityId = event.dataTransfer.getData("activityId");

    // Log the dropped date to the console
    console.log("Dropped on date: ", format(date, "yyyy-MM-dd"));

    const updatedActivitiesList = updatedActivities.map((activity) =>
      activity.id === parseInt(activityId)
        ? { ...activity, newDate: format(date, "yyyy-MM-dd") }
        : activity
    );

    setUpdatedActivities(updatedActivitiesList);

    const updatedEvent = updatedActivitiesList.find(
      (activity) => activity.id === parseInt(activityId)
    );

    if (updatedEvent.documentId) {
      const payload = {
        data: {
          newDate: format(date, "yyyy-MM-dd"),
        },
      };

      try {
        const response = await fetch(
          `https://lionfish-app-98urn.ondigitalocean.app/api/rescheduled-events/${updatedEvent.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          console.log("Event updated successfully!");
        } else {
          const data = await response.json();
          console.error("Error updating event:", data);
        }
      } catch (error) {
        console.error("Error during API request:", error);
      }
    } else {
      console.error("No documentId found for the event.");
    }
    event.target.style.opacity = 1; // Reset opacity after touch end
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const calendarDays = getCalendarDays(currentDate);

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
                key={date}
                date={date}
                currentDate={currentDate}
                activitiesForThisDate={activitiesForThisDate}
                handleDrop={handleDrop}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                handleDragOver={handleDragOver}
                handleTouchStart={handleTouchStart} // Touch start event for mobile
                handleTouchMove={handleTouchMove} // Touch move event for mobile
                handleTouchEnd={handleTouchEnd} // Touch end event for mobile
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { GET_ACCOUNT_BY_EMAIL } from "@/lib/hygraph";
// import { Confidence } from "@/public/Icons";
// import { KindiHeart } from "@/public/Images";
// import { ArrowRight } from "lucide-react";
// import { GraphQLClient } from "graphql-request";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const icons = [
//   {
//     icon: KindiHeart,
//     color: "#c42797",
//   },
//   {
//     icon: Confidence,
//     color: "#029871",
//   },
//   {
//     icon: KindiHeart,
//     color: "#3f3a64",
//   },
//   {
//     icon: Confidence,
//     color: "#ff8e00",
//   },
// ];

// const HYGRAPH_ENDPOINT =
//   "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
// const HYGRAPH_TOKEN =
//   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";
// const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
//   headers: {
//     Authorization: `Bearer ${HYGRAPH_TOKEN}`,
//   },
// });

// const getAllActivities = async () => {
//   const query = `
//       query {
//         activities {
//           id
//           title
//           setUpTime
//           themeName
//           skills
//           focusAge
//           activityDate
//           content {
//             html
//           }
//           thumbnail {
//             url
//           }
//         }
//       }
//     `;

//   try {
//     const res = await fetch(HYGRAPH_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${HYGRAPH_TOKEN}`,
//       },
//       body: JSON.stringify({ query }),
//     });

//     if (!res.ok) {
//       throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
//     }

//     const jsonData = await res.json();

//     if (jsonData.errors) {
//       console.error("GraphQL Errors:", jsonData.errors);
//       throw new Error("Failed to fetch activities due to GraphQL errors.");
//     }

//     // Transform the data to match the event format
//     const activities = jsonData.data?.activities.map((activity) => ({
//       id: activity.id,
//       date: new Date(activity.activityDate), // Ensure to parse the date correctly
//       title: activity.title,
//       description: activity.content.html, // Assuming you want the HTML content
//       thumbnail: activity.thumbnail
//         ? {
//             url: activity.thumbnail.url,
//           }
//         : null,
//     }));
//     console.log("Activity Data:", activities);

//     return activities || [];
//   } catch (error) {
//     console.error("Error fetching activities:", error);
//     return [];
//   }
// };

// export default function TestingCalendar() {
//   // const { data: session } = useSession();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const today = new Date();
//   const [draggedEvent, setDraggedEvent] = useState(null);
//   const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });

//   const isBrowser = typeof window !== "undefined";

//   // Initial loading of events from localStorage
//   const [events, setEvents] = useState(() => {
//     if (!isBrowser) return [];
//     try {
//       const savedEvents = localStorage.getItem("events");
//       return savedEvents ? JSON.parse(savedEvents) : [];
//     } catch (error) {
//       console.error("Error loading events from localStorage:", error);
//       return [];
//     }
//   });

//   // Save events to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("events", JSON.stringify(events));
//   }, [events]);

//   // Fetch activities from Hygraph only once if localStorage has no events
//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const activitiesFromHygraph = await getAllActivities();
//         console.log("Activities fetched from Hygraph:", activitiesFromHygraph);

//         if (events.length === 0) {
//           // Only set events from Hygraph if local storage is empty
//           setEvents(activitiesFromHygraph);
//         }
//       } catch (error) {
//         console.error("Error fetching activities from Hygraph:", error);
//       }
//     };

//     fetchActivities();
//   }, []);

//   // Fetch user data when session changes
//   // useEffect(() => {
//   //   if (session && session.user) {
//   //     fetchUserData(session.user.email);
//   //   }
//   // }, [session]);

//   // const fetchUserData = async (email) => {
//   //   try {
//   //     const data = await client.request(GET_ACCOUNT_BY_EMAIL, { email });
//   //     console.log("User Data:", data);
//   //     setProfileData(data.account);
//   //   } catch (error) {
//   //     console.error("Error fetching profile data:", error);
//   //   }
//   // };

//   const handlePrevMonth = () => {
//     const newDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() - 1,
//       1
//     );
//     setCurrentDate(newDate);
//   };

//   const handleNextMonth = () => {
//     const newDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       1
//     );
//     setCurrentDate(newDate);
//   };

//   // Generate monthly calendar
//   const generateCalendar = () => {
//     const startOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       1
//     );
//     const endOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     );
//     const daysInMonth = endOfMonth.getDate();
//     const firstDayOfWeek = startOfMonth.getDay();

//     const totalDaysToShow = firstDayOfWeek + daysInMonth > 35 ? 42 : 35;

//     const totalDays = Array.from({ length: totalDaysToShow }, (_, i) => {
//       if (i < firstDayOfWeek) {
//         // Days from the previous month
//         const prevMonthEnd = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           0
//         ).getDate();
//         return {
//           day: prevMonthEnd - (firstDayOfWeek - 1 - i),
//           isCurrentMonth: false,
//         };
//       } else if (i >= daysInMonth + firstDayOfWeek) {
//         return {
//           day: i - (daysInMonth + firstDayOfWeek) + 1,
//           isCurrentMonth: false,
//         };
//       }
//       return {
//         day: i - firstDayOfWeek + 1,
//         isCurrentMonth: true,
//       };
//     });

//     return totalDays;
//   };

//   const checkEventForDate = (day) => {
//     return events.filter((event) => {
//       const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
//       const currentDay = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         day
//       ).setHours(0, 0, 0, 0);
//       return eventDate === currentDay;
//     });
//   };

//   const onDragStart = (e, event) => {
//     e.dataTransfer.setData("text/plain", event.id);
//     setDraggedEvent(event);
//   };

//   const onTouchStart = (e, event) => {
//     e.preventDefault();
//     setDraggedEvent(event);
//     setTouchStartPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
//   };

//   const onTouchMove = (e) => {
//     e.preventDefault();
//     const touch = e.touches[0];
//     const draggedElement = document.getElementById(`event-${draggedEvent.id}`);

//     if (draggedElement) {
//       draggedElement.style.position = "absolute";
//       draggedElement.style.top = `${touch.clientY - touchStartPosition.y}px`;
//       draggedElement.style.left = `${touch.clientX - touchStartPosition.x}px`;
//     }
//   };

//   const onTouchEnd = (e) => {
//     e.preventDefault();
//     const touch = e.changedTouches[0];
//     const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
//     if (dropTarget && dropTarget.classList.contains("calendar-day")) {
//       const newDay = dropTarget.getAttribute("data-day");
//       moveEventToNewDay(draggedEvent, newDay);
//     }
//     setDraggedEvent(null);
//   };

//   const onDrop = (e, day) => {
//     e.preventDefault();
//     const eventId = e.dataTransfer.getData("text");
//     const event = events.find((ev) => ev.id === eventId);
//     if (event) {
//       moveEventToNewDay(event, day);
//     }
//     setDraggedEvent(null);
//   };

//   const onDragOver = (e) => {
//     e.preventDefault();
//   };

//   const moveEventToNewDay = (event, newDay) => {
//     console.log(`Moving event ${event.id} to ${newDay}`);
//     setEvents((prevEvents) =>
//       prevEvents.map((ev) =>
//         ev.id === event.id
//           ? {
//               ...ev,
//               date: `${currentDate.getFullYear()}-${
//                 currentDate.getMonth() + 1
//               }-${newDay}`,
//             }
//           : ev
//       )
//     );
//   };

//   const days = generateCalendar();

//   return (
//     <div className="max-w-full flex flex-col gap-4 justify-center items-center w-full mx-auto p-0">
//       {/* Calendar Top Navigation */}
//       <div className="flex justify-center gap-4 w-full items-center">
//         <button onClick={handlePrevMonth}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="red"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-square-chevron-left"
//           >
//             <rect width="18" height="18" x="3" y="3" rx="2" />
//             <path d="m14 16-4-4 4-4" />
//           </svg>
//         </button>
//         <h2 className="text-xl flex justify-center items-center text-center font-bold font-fredoka text-purple">
//           {currentDate.toLocaleString("default", { month: "long" })} |{" "}
//           {currentDate.getFullYear()}
//         </h2>
//         <button onClick={handleNextMonth}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="red"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-square-chevron-right"
//           >
//             <rect width="18" height="18" x="3" y="3" rx="2" />
//             <path d="m10 8 4 4-4 4" />
//           </svg>
//         </button>
//       </div>

//       {/* Calendar Top Weekdays  */}
//       <div className="flex-col flex lg:grid font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full grid-cols-7 gap-0 text-center">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <div
//             key={day}
//             className="font-semibold w-full justify-center items-center text-center hidden uppercase lg:flex font-fredoka text-[#3F3A64] py-2 gap-0"
//           >
//             {day}
//           </div>
//         ))}

//         {/* Monthly Calendar Date View  */}
//         {days.map((dayObj, index) => {
//           const isToday =
//             dayObj.isCurrentMonth &&
//             dayObj.day === today.getDate() &&
//             currentDate.getMonth() === today.getMonth() &&
//             currentDate.getFullYear() === today.getFullYear();

//           const eventsForDay = checkEventForDate(dayObj.day);
//           const eventCount = eventsForDay.length;

//           return (
//             <div
//               key={index}
//               data-day={dayObj.day}
//               onDragOver={onDragOver}
//               onDrop={(e) => onDrop(e, dayObj.day)}
//               className={`p-2 gap-[2px] flex flex-col font-fredoka justify-start items-start border-[1.2px] border-[white] w-full min-h-[40px] h-fit lg:h-[140px] ${
//                 !dayObj.isCurrentMonth
//                   ? "bg-[#EFEFEF] text-[#8C8C8C] cursor-not-allowed"
//                   : isToday
//                   ? "bg-[#ffd9d9] text-[#000000] "
//                   : dayObj.day < today.getDate() &&
//                     currentDate.getMonth() === today.getMonth()
//                   ? "bg-[#DCDCE8] text-[#999] cursor-not-allowed" // Past dates in the current month
//                   : "bg-[#eaeaf5] lg:bg-[#DCDCE8] cursor-pointer"
//               }`}
//             >
//               <div className="flex w-full justify-between">
//                 <span className="text-right">{dayObj.day}</span>
//                 {/* Show +X for additional events - Used for showing Number of event having more than one in same date */}
//                 {eventCount > 1 && (
//                   <div className="mt-1 text-sm text-gray-600">
//                     +{eventCount - 1} more
//                   </div>
//                 )}
//               </div>

//               {/* Show events if they exist */}
//               {/* {checkEventForDate(dayObj.day).map((event) => ( */}
//               {/* {eventsForDay.map((event, index) => ( */}
//               {checkEventForDate(dayObj.day).map((event) => (
//                 <div
//                   key={event.id}
//                   draggable
//                   className="w-full bg-white shadow-md rounded-lg p-2 text-sm"
//                   onDragStart={(e) => onDragStart(e, event)}
//                   onTouchStart={(e) => onTouchStart(e, event)}
//                   onTouchMove={onTouchMove}
//                   onTouchEnd={onTouchEnd}
//                 >
//                   {/* Show only the title if there are multiple events, otherwise show title and description */}
//                   {eventCount > 1 ? (
//                     <p className="font-semibold text-[14px] leading-[16px] lg:leading-[12px] lg:text-[12px] text-start">
//                       {event.title}
//                     </p>
//                   ) : (
//                     <>
//                       <div className="flex flex-col w-full gap-1 justify-between items-start">
//                         <div className="flex w-full justify-between gap-1 lg:gap-0 items-start">
//                           <p className="font-semibold  text-[14px] leading-[16px] lg:text-[12px] lg:leading-[12px] text-start">
//                             {event.title}
//                           </p>
//                           {/* Drag icon */}
//                           <div className="cursor-grab text-gray-500 items-start">
//                             <span className="text-xl flex items-start hover:scale-110 duration-300">
//                               ⋮⋮
//                             </span>{" "}
//                           </div>
//                         </div>
//                         <div className="flex w-full gap-2 justify-between items-end">
//                           <div className="flex w-full  rounded-[4px]  max-w-[40px] object-cover h-[40px] overflow-clip">
//                             <Image
//                               src={event.thumbnail.url} // Make sure this matches the actual property name
//                               alt="ScheduleEvent"
//                               className="w-[40px] rounded-[4px] object-cover h-[40px]"
//                               width={40}
//                               height={40}
//                             />
//                           </div>

//                           <div className="flex w-full justify-between flex-col items-start">
//                             <div className="flex gap-1 items-center ">
//                               <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
//                                 {event.focusAge || "Toddler"}
//                               </div>
//                               <span className="flex items-center">•</span>
//                               <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
//                                 {event.themeName || "Winter"}
//                               </div>
//                             </div>
//                             <div className="flex flex-row justify-start items-center  w-full gap-[4px]">
//                               {icons.map((iconData, index) => (
//                                 <div
//                                   key={index}
//                                   className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-[4px]`}
//                                   style={{ backgroundColor: iconData.color }}
//                                 >
//                                   <Image
//                                     className="w-4 h-4"
//                                     src={iconData.icon}
//                                     alt={iconData.icon.name}
//                                   />
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div
//                         className={`-mb-[24px] w-full justify-between items-center`}
//                       >
//                         <div />
//                         <Link
//                           target="_blank"
//                           href={`/p/activities/${event.id}`}
//                           className={`w-fit px-[6px] py-[2px] text-red shadow-md rounded-lg p-2 text-sm`}
//                         >
//                           <p className="font-semibold flex justify-end items-center text-[14px] leading-[16px] lg:leading-[12px] lg:text-[12px] text-start">
//                             Lets Start &nbsp; <ArrowRight />
//                           </p>
//                         </Link>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // export default function TestingCalendar() {
// //   const [currentDate, setCurrentDate] = useState(new Date());
// //   const today = new Date();
// //   const [draggedEvent, setDraggedEvent] = useState(null);
// //   const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });
// //   const [events, setEvents] = useState([]);

// //   // Fetch activities from Hygraph
// //   const getAllActivities = async () => {
// //     const query = `
// //       query {
// //         activities {
// //           id
// //           title
// //           setUpTime
// //           themeName
// //           skills
// //           focusAge
// //           activityDate
// //           content {
// //             html
// //           }
// //           thumbnail {
// //             url
// //           }
// //         }
// //       }
// //     `;

// //     try {
// //       const res = await fetch(HYGRAPH_ENDPOINT, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${HYGRAPH_TOKEN}`,
// //         },
// //         body: JSON.stringify({ query }),
// //       });

// //       if (!res.ok) {
// //         throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
// //       }

// //       const jsonData = await res.json();

// //       if (jsonData.errors) {
// //         console.error("GraphQL Errors:", jsonData.errors);
// //         throw new Error("Failed to fetch activities due to GraphQL errors.");
// //       }

// //       // Transform the data to match the event format
// //       const activities = jsonData.data?.activities.map((activity) => ({
// //         id: activity.id,
// //         date: new Date(activity.activityDate), // Ensure to parse the date correctly
// //         title: activity.title,
// //         description: activity.content.html, // Assuming you want the HTML content
// //         thumbnail: activity.thumbnail
// //           ? {
// //               url: activity.thumbnail.url,
// //             }
// //           : null,
// //       }));

// //       setEvents(activities || []);
// //     } catch (error) {
// //       console.error("Error fetching activities:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     getAllActivities();
// //   }, []);

// //   const handlePrevMonth = () => {
// //     const newDate = new Date(
// //       currentDate.getFullYear(),
// //       currentDate.getMonth() - 1,
// //       1
// //     );
// //     setCurrentDate(newDate);
// //   };

// //   const handleNextMonth = () => {
// //     const newDate = new Date(
// //       currentDate.getFullYear(),
// //       currentDate.getMonth() + 1,
// //       1
// //     );
// //     setCurrentDate(newDate);
// //   };

// //   // Function to generate calendar days
// //   const generateCalendar = () => {
// //     const startOfMonth = new Date(
// //       currentDate.getFullYear(),
// //       currentDate.getMonth(),
// //       1
// //     );
// //     const endOfMonth = new Date(
// //       currentDate.getFullYear(),
// //       currentDate.getMonth() + 1,
// //       0
// //     );
// //     const daysInMonth = endOfMonth.getDate();
// //     const firstDayOfWeek = startOfMonth.getDay();

// //     const totalDaysToShow = firstDayOfWeek + daysInMonth > 35 ? 42 : 35;

// //     const totalDays = Array.from({ length: totalDaysToShow }, (_, i) => {
// //       if (i < firstDayOfWeek) {
// //         const prevMonthEnd = new Date(
// //           currentDate.getFullYear(),
// //           currentDate.getMonth(),
// //           0
// //         ).getDate();
// //         return {
// //           day: prevMonthEnd - (firstDayOfWeek - 1 - i),
// //           isCurrentMonth: false,
// //         };
// //       } else if (i >= daysInMonth + firstDayOfWeek) {
// //         return {
// //           day: i - (daysInMonth + firstDayOfWeek) + 1,
// //           isCurrentMonth: false,
// //         };
// //       }
// //       return {
// //         day: i - firstDayOfWeek + 1,
// //         isCurrentMonth: true,
// //       };
// //     });

// //     return totalDays;
// //   };

// //   // Check events for a specific day
// //   const checkEventForDate = (day) => {
// //     return events.filter((event) => {
// //       const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
// //       const currentDay = new Date(
// //         currentDate.getFullYear(),
// //         currentDate.getMonth(),
// //         day
// //       ).setHours(0, 0, 0, 0);
// //       return eventDate === currentDay;
// //     });
// //   };

// //   // Event dragging and dropping logic
// //   const onDragStart = (e, event) => {
// //     e.dataTransfer.setData("text/plain", event.id);
// //     setDraggedEvent(event);
// //   };

// //   const onTouchStart = (e, event) => {
// //     e.preventDefault();
// //     setDraggedEvent(event);
// //     setTouchStartPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
// //   };

// //   const onTouchMove = (e) => {
// //     e.preventDefault();
// //     const touch = e.touches[0];
// //     const draggedElement = document.getElementById(`event-${draggedEvent.id}`);

// //     if (draggedElement) {
// //       draggedElement.style.position = "absolute";
// //       draggedElement.style.top = `${touch.clientY - touchStartPosition.y}px`;
// //       draggedElement.style.left = `${touch.clientX - touchStartPosition.x}px`;
// //     }
// //   };

// //   const onTouchEnd = (e) => {
// //     e.preventDefault();
// //     const touch = e.changedTouches[0];
// //     const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
// //     if (dropTarget && dropTarget.classList.contains("calendar-day")) {
// //       const newDay = dropTarget.getAttribute("data-day");
// //       moveEventToNewDay(draggedEvent, newDay);
// //     }
// //     setDraggedEvent(null);
// //   };

// //   const onDrop = (e, day) => {
// //     e.preventDefault();
// //     const eventId = e.dataTransfer.getData("text");
// //     const event = events.find((ev) => ev.id === eventId);
// //     if (event) {
// //       moveEventToNewDay(event, day);
// //     }
// //     setDraggedEvent(null);
// //   };

// //   const onDragOver = (e) => {
// //     e.preventDefault();
// //   };

// //   const moveEventToNewDay = (event, newDay) => {
// //     const newDate = new Date(
// //       currentDate.getFullYear(),
// //       currentDate.getMonth(),
// //       newDay
// //     );

// //     // Check if the new date is in the past
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison

// //     if (newDate < today) {
// //       alert("You cannot drop an event in the past."); // Notify the user
// //       return; // Prevent the drop action
// //     }

// //     console.log(`Moving event ${event.id} to ${newDay}`);
// //     setEvents((prevEvents) =>
// //       prevEvents.map((ev) =>
// //         ev.id === event.id
// //           ? {
// //               ...ev,
// //               date: `${currentDate.getFullYear()}-${
// //                 currentDate.getMonth() + 1
// //               }-${newDay}`,
// //             }
// //           : ev
// //       )
// //     );
// //   };

// //   const days = generateCalendar();

// //   // Adding the Action button and border for future events
// //   const isFutureEvent = (eventDate) => {
// //     const currentDate = new Date();
// //     const eventDateObj = new Date(eventDate);
// //     return eventDateObj >= currentDate; // True if the event is today or in the future
// //   };

// //   return (
// //     <div className="max-w-full flex flex-col gap-4 justify-center items-center w-full mx-auto p-0">
// //       {/* Calendar Top Navigation */}
// //       <div className="flex justify-center gap-4 w-full items-center">
// //         <button onClick={handlePrevMonth}>
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             width="24"
// //             height="24"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="red"
// //             strokeWidth="2"
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             className="lucide lucide-square-chevron-left"
// //           >
// //             <rect width="18" height="18" x="3" y="3" rx="2" />
// //             <path d="m14 16-4-4 4-4" />
// //           </svg>
// //         </button>
// //         <h2 className="text-xl flex justify-center items-center text-center font-bold font-fredoka text-purple">
// //           {currentDate.toLocaleString("default", { month: "long" })} |{" "}
// //           {currentDate.getFullYear()}
// //         </h2>
// //         <button onClick={handleNextMonth}>
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             width="24"
// //             height="24"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="red"
// //             strokeWidth="2"
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             className="lucide lucide-square-chevron-right"
// //           >
// //             <rect width="18" height="18" x="3" y="3" rx="2" />
// //             <path d="m10 8 4 4-4 4" />
// //           </svg>
// //         </button>
// //       </div>

// //       {/* Calendar Top Weekdays  */}
// //       <div className="flex-col flex lg:grid font-fredoka p-0 lg:p-4 bg-[#eaeaf5] lg:bg-[#DCDCE8] rounded-[20px] w-full grid-cols-7 gap-0 text-center">
// //         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
// //           <div
// //             key={day}
// //             className="font-semibold w-full justify-center items-center text-center hidden uppercase lg:flex font-fredoka text-[#3F3A64] py-2 gap-0"
// //           >
// //             {day}
// //           </div>
// //         ))}

// //         {/* Monthly Calendar Date View  */}
// //         {days.map((dayObj, index) => {
// //           const isToday =
// //             dayObj.isCurrentMonth &&
// //             dayObj.day === today.getDate() &&
// //             currentDate.getMonth() === today.getMonth() &&
// //             currentDate.getFullYear() === today.getFullYear();

// //           const eventsForDay = checkEventForDate(dayObj.day);
// //           const eventCount = eventsForDay.length;

// //           return (
// //             <div
// //               key={index}
// //               data-day={dayObj.day}
// //               onDragOver={onDragOver}
// //               onDrop={(e) => onDrop(e, dayObj.day)}
// //               className={`p-2 gap-[2px] flex flex-col font-fredoka justify-start items-start border-[1.2px] border-[white] w-full min-h-[40px] h-fit lg:h-[140px] ${
// //                 !dayObj.isCurrentMonth
// //                   ? "bg-[#EFEFEF] text-[#8C8C8C] cursor-not-allowed"
// //                   : isToday
// //                   ? "bg-[#ffd9d9] text-[#000000] "
// //                   : dayObj.day < today.getDate() &&
// //                     currentDate.getMonth() === today.getMonth()
// //                   ? "bg-[#DCDCE8] text-[#999] cursor-not-allowed"
// //                   : "bg-[#eaeaf5] lg:bg-[#DCDCE8] cursor-pointer"
// //               }`}
// //             >
// //               <div className="flex w-full justify-between">
// //                 <span className="text-right">{dayObj.day}</span>
// //                 {eventCount > 1 && (
// //                   <div className="mt-1 text-sm text-gray-600">
// //                     +{eventCount - 1} more
// //                   </div>
// //                 )}
// //               </div>

// //               {eventsForDay.map((event) => (
// //                 // <Link
// //                 //   href={`/p/activities/${event.id}`}
// //                 //   key={event.id}
// //                 //   draggable
// //                 //   className="w-full my-2 bg-white shadow-md rounded-lg p-2 text-sm"
// //                 //   onDragStart={(e) => onDragStart(e, event)}
// //                 //   onTouchStart={(e) => onTouchStart(e, event)}
// //                 //   onTouchMove={onTouchMove}
// //                 //   onTouchEnd={onTouchEnd}
// //                 // >
// //                 //   <p className="font-semibold text-[14px] leading-[16px] lg:text-[12px] text-start">
// //                 //     {event.title}
// //                 //   </p>
// //                 // </Link>
// //                 <Link
// //                   href={`/p/activities/${event.id}`}
// //                   key={event.id}
// //                   draggable
// //                   className={`w-full my-2 ${
// //                     isFutureEvent(event.date)
// //                       ? "border-2 border-red"
// //                       : "border-0"
// //                   } bg-white shadow-md rounded-lg p-2 text-sm`}
// //                   onDragStart={(e) => onDragStart(e, event)}
// //                   onTouchStart={(e) => onTouchStart(e, event)}
// //                   onTouchMove={onTouchMove}
// //                   onTouchEnd={onTouchEnd}
// //                 >
// //                   {/* Show only the title if there are multiple events, otherwise show title and description */}
// //                   {eventCount > 1 ? (
// //                     <p
// //                       className={`font-semibold ${
// //                         isFutureEvent(event.date)
// //                           ? "border-2 border-white"
// //                           : "border-0"
// //                       } text-[14px] border-0 border-white leading-[16px] lg:leading-[12px] lg:text-[12px] text-start`}
// //                     >
// //                       {event.title}
// //                     </p>
// //                   ) : (
// //                     <>
// //                       <div className="flex flex-col w-full gap-1 justify-between items-start">
// //                         <div className="flex w-full justify-between gap-1 lg:gap-0 items-start">
// //                           <p className="font-semibold  text-[14px] leading-[16px] lg:text-[12px] lg:leading-[12px] text-start">
// //                             {event.title}
// //                           </p>
// //                           {/* Drag icon */}
// //                           <div className="cursor-grab text-gray-500 items-start">
// //                             <span className="text-xl flex items-start">⋮⋮</span>{" "}
// //                           </div>
// //                         </div>
// //                         <div className="flex w-full gap-2 justify-between items-end">
// //                           <div className="flex w-full  rounded-[4px]  max-w-[40px] object-cover h-[40px] overflow-clip">
// //                             <Image
// //                               src={event.thumbnail.url}
// //                               alt="ScheduleEvent"
// //                               className="w-[40px] rounded-[4px] object-cover h-[40px]"
// //                               width={40}
// //                               height={40}
// //                             />
// //                           </div>

// //                           <div className="flex w-full justify-between flex-col items-start">
// //                             <div className="flex gap-1 items-center ">
// //                               <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
// //                                 {event.focusAge || " Toddler"}
// //                               </div>
// //                               <span className="flex items-center">•</span>
// //                               <div className="text-[#0a1932] text-[12px] leading-[14px] lg:text-[9px] lg:leading-[10px] font-semibold font-fredoka">
// //                                 {event.themeName || "Forest"}
// //                               </div>
// //                             </div>
// //                             <div className="flex flex-row justify-start items-center  w-full gap-[4px]">
// //                               {icons.map((iconData, index) => (
// //                                 <div
// //                                   key={index}
// //                                   className={`w-[20px] h-[20px] p-1 flex justify-center items-center rounded-[4px]`}
// //                                   style={{ backgroundColor: iconData.color }}
// //                                 >
// //                                   <Image
// //                                     className="w-4 h-4"
// //                                     src={iconData.icon}
// //                                     alt={iconData.icon.name}
// //                                   />
// //                                 </div>
// //                               ))}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div
// //                         className={`-mb-[24px] ${
// //                           isFutureEvent(event.date) ? "flex" : "hidden"
// //                         } w-full justify-between items-center`}
// //                       >
// //                         <div />
// //                         <Link
// //                           href={`/p/activities/${event.id}`}
// //                           className={`w-fit px-[6px] py-[2px]  bg-red text-white shadow-md rounded-lg p-2 text-sm`}
// //                         >
// //                           <p className="font-semibold flex items-center text-[14px] leading-[16px] lg:leading-[12px] lg:text-[12px] text-start">
// //                             Lets Start &nbsp; <ArrowRight />
// //                           </p>
// //                         </Link>
// //                       </div>
// //                     </>
// //                   )}
// //                 </Link>
// //               ))}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }
