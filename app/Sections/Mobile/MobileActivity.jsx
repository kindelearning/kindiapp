"use client";

import {
  DiscoveringOurWorldActivity,
  ExperimentsMathActivity,
  ReadingWritingActivity,
  SpeechLanguageActivity,
  ThemeDummy,
} from "@/public/Images";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import Link from "next/link";
import { act, useEffect, useMemo, useState } from "react";
import { getIconForSkill } from "../Activity/ActivityCard";
const API_URL =
  "https://lionfish-app-98urn.ondigitalocean.app/api/activities?populate=*";

const LocalActivityCard = ({ activity, activityUrl }) => {
  if (!activity) return null; // Prevent rendering if activity is undefined

  const {
    id,
    documentId,
    Title,
    SetUpTime,
    FocusAge,
    LearningAreaIcons,
    Gallery,
  } = activity;
  const imageUrl = Array.isArray(Gallery)
    ? Gallery[0]?.url // If it's an array, use the first image
    : Gallery?.url || "/Images/ActivityImage.png";
  return (
    <Link target="_blank" href={activityUrl}>
      <div className="md:w-full hover:shadow-md duration-200 min-w-[200px] w-[200px] min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
        <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
          <div className="w-full max-w-[240px] lg:max-w-full h-auto">
            {/* Image Container */}
            <div className="flex max-h-[180px] min-h-[150px] h-[150px] lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] overflow-clip rounded-t-2xl">
              {imageUrl ? (
                <img
                  width={280}
                  height={250}
                  alt={Title}
                  className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                  src={`https://lionfish-app-98urn.ondigitalocean.app${imageUrl}`}
                  // src={imageUrl}
                />
              ) : (
                <Image
                  width={280}
                  height={250}
                  alt="ThemeDummy"
                  className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-3xl"
                  src={ThemeDummy}
                />
              )}
            </div>
            {/* Text Content */}
            <div className="w-full p-2 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
              <div className="flex-col w-full gap-[6px] justify-start items-start">
                <div className="text-[#0a1932] text-[12px] md:text-[16px] font-semibold font-fredoka leading-[20px]">
                  {Title?.length > 24
                    ? `${Title.slice(0, 24)}...`
                    : Title || "Untitled"}
                </div>
                <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex px-0 lg:text-[16px] text-[10px] font-normal font-fredoka">
                    {SetUpTime || "N/A"}
                  </div>
                  •
                  <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex px-0 lg:text-[16px] text-[10px] font-normal font-fredoka">
                    {FocusAge || "N/A"}
                  </div>
                  {/*  • <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex px-0 lg:text-[16px] text-[10px] font-normal font-fredoka">
                    {Theme || "N/A"}
                  </div> */}
                </div>
              </div>
              {/* Icons (Static for now, can be dynamic if categories have icons) */}
              <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                {LearningAreaIcons?.slice(0, 5).map((skill, index) => {
                  const skillTitle = skill.children?.[0]?.text; // Extract skill title
                  const iconUrl = getIconForSkill(skillTitle); // Get icon URL using the passed prop
                  return (
                    <div
                      key={index}
                      className="activity-icon  flex items-center gap-2"
                    >
                      {iconUrl && (
                        <img
                          title={skillTitle}
                          src={iconUrl.src}
                          alt={skillTitle}
                          className="w-6 lg:w-10 lg:h-10 h-6"
                          width={iconUrl.width} // Optionally set width and height
                          height={iconUrl.height}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};


export default function MobileActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 6; // Adjust this value as needed

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw new Error("Failed to fetch activities. Please try again.");

        const result = await response.json();
        const activitiesData = Array.isArray(result?.data) ? result.data : [];

        setActivities(activitiesData);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(activities.map((item) => item.category))];
  }, [activities]);

  // Paginate the activities for the current page
  const paginatedActivities = useMemo(() => {
    const startIdx = (currentPage - 1) * activitiesPerPage;
    const endIdx = startIdx + activitiesPerPage;
    return activities.slice(startIdx, endIdx);
  }, [activities, currentPage]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!activities.length) return <p>No activities found.</p>;

  return (
    <section className="w-full h-auto bg-[#F5F5F5] items-center justify-center py-4 flex transition-all animate-fade-in duration-300 flex-col md:flex-row gap-[20px]">
      <div className="claracontainer w-full flex-col justify-start gap-4 items-center script inline-flex">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category}
              className="w-full flex flex-col px-4 justify-start items-center gap-2"
            >
              <div className="flex justify-between items-center w-full">
                <h1 className="clarabodyTwo text-[#0A1932] w-full text-start">
                  {category}
                </h1>

                <Dialog>
                  <DialogTrigger>
                    <div className="clarabodyTwo text-red min-w-[max-content]">
                      View All
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-full p-4 font-fredoka max-h-[600px] overflow-y-scroll max-w-[96%]">
                    <DialogHeader>
                      <DialogTitle>Explore More Activities</DialogTitle>
                      <DialogDescription className="flex w-full flex-col gap-2 my-2">
                        View all activities in the
                        <span className="text-red font-semibold">
                          {category}{" "}
                        </span>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 justify-between ">
                          {paginatedActivities
                            .filter(
                              (activity) => activity.category === category
                            )
                            .map((activity) => (
                              <LocalActivityCard
                                key={activity.id}
                                activityUrl={`/p/activities/${
                                  activity.documentId || "#"
                                }`}
                                activity={activity}
                              />
                            ))}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center my-4">
                      {/* Pagination Controls */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50"
                      >
                        Prev
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-4 py-2 mx-2 rounded-lg ${
                            currentPage === index + 1
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-300'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded-lg disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="lg:grid claracontainer w-full flex flex-row overflow-x-scroll scrollbar-hidden gap-4 lg:grid-cols-2 xl:grid-cols-2">
                {activities.filter((activity) => activity.category === category)
                  .length > 0 ? (
                  activities
                    .filter((activity) => activity.category === category)
                    .sort(() => Math.random() - 0.5) // Shuffle activities randomly
                    .slice(0, 9) // Limit to 9 activities
                    .map((activity) => (
                      <LocalActivityCard
                        key={activity.id}
                        activityUrl={`/p/activities/${
                          activity.documentId || "#"
                        }`} // Fallback for missing documentId
                        activity={activity}
                      />
                    ))
                ) : (
                  <p className="text-gray-500">
                    No activities available in this category.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </section>
  );
}

