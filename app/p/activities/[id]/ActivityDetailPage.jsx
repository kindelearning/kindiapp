"use client";

import NewHeader from "@/app/Sections/Mobile/NewHeader";
import ProductMedia from "@/app/shop/section/ProductMedia";
import {
  ActivityBlack,
  ActivityImage,
  KidBlack,
  Themes,
  TimerBlack,
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
import React, { useEffect, useState } from "react";
import ResourceCard from "../ActivityResource";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Accordian } from "@/app/Widgets";
import { getIconForSkill } from "@/app/Sections/Activity/ActivityCard";

export async function fetchActivityByDocumentId(documentId) {
  const res = await fetch(
    `https://lionfish-app-98urn.ondigitalocean.app/api/activities/${documentId}?populate=*`
  );
  const data = await res.json();
  if (!data || !data.data) {
    return null; // If data is not found
  }

  return data.data;
}

export const ActivityAttribute = ({
  title = " Event Timeline",
  features = " 18th September 2023",
  image,
}) => {
  return (
    <div className="w-full cursor-pointer justify-between items-center inline-flex">
      <div className="justify-start w-full items-center gap-2 flex">
        <Image
          alt="Kindi"
          src={image || Themes}
          className="text-[#0a1932] w-4 h-4"
        />
        <div className=" text-[#0a1932] w-full text-[16px] font-normal font-fredoka leading-none">
          {title}
        </div>
      </div>
      <div className="text-[#0a1932] text-[16px] w-full justify-start items-center font-semibold font-fredoka leading-none">
        {features}
      </div>
    </div>
  );
};

export default function ActivityDetailPage({ params }) {
  const { id } = params;
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Avoid fetching if `id` is undefined or null
    if (!id) {
      setError("Invalid or missing activity ID.");
      setLoading(false);
      return;
    }

    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await fetchActivityByDocumentId(id); // Ensure this function is defined
        setActivity(response);
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError("Failed to load activity data.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  console.log("Activity Data", activity);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!activity) {
    return <div>Failed to load data or activity not found.</div>; // Fallback message if data is not found
  }

  const {
    Title,
    Skills,
    LearningAreaIcons,
    Theme,
    FocusAge,
    ActivityDate,
    SetUpTime,
    Gallery,
    Accordions,
  } = activity;
  return (
    <>
      {/* <NewHeader headerText="Activity" />
      <div className="w-full hidden text-[#3f3a64] claraheading capitalize">
        {Title}
      </div>
      <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
        {Gallery && Gallery.length > 0 ? (
          <ProductMedia gallery={Gallery} />
        ) : (
          <div className="w-full overflow-clip rounded-lg h-[300px] max-h-[300px] lg:h-[400px] lg:max-h-[400px] mb-4">
            <Image
              className="w-full h-full rounded-lg max-h-[300px] lg:h-[400px] lg:max-h-[400px] object-cover"
              alt="Placeholder Image"
              src={ActivityImage}
            />
          </div>
        )}
      </div> */}
      <NewHeader headerText={Title || "Activity"} />
      <section className="w-full h-auto -my-[16px] bg-[#EAEAF5] items-center justify-center py-0 px-0 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-0 lg:p-8 xl:p-12 w-full flex flex-col md:flex-row overflow-hidden gap-8">
          <div className="w-full hidden text-[#3f3a64] claraheading capitalize">
            {Title}
          </div>
          <div className="claracontainer lg:min-w-[60%] lg:w-full bg-[#ffffff] md:bg-[#ffffff] pb-4 lg:bg-[#eaeaf5] py-0 flex flex-col justify-start items-start gap-4">
            <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
              {Gallery ? (
                <ProductMedia gallery={Gallery} />
              ) : (
                <div className="w-full overflow-clip rounded-lg h-[300px] max-h-[300px] lg:h-[400px] lg:max-h-[400px] mb-4">
                  <Image
                    className="w-full h-full rounded-lg max-h-[300px] lg:h-[400px] lg:max-h-[400px object-cover rounded-lg"
                    alt="Placholder Image"
                    src={ActivityImage}
                  />
                </div>
              )}
            </div>
            <div className="claracontainer lg:hidden w-full flex flex-col px-4 lg:px-0 justify-start items-start gap-4">
              <div className="flex w-full flex-col justify-normal items-center gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  {Title || "Activity Title"}
                </div>
                <div className="items-center cursor-pointer w-full justify-center flex flex-col gap-2">
                  <ActivityAttribute
                    image={ActivityBlack}
                    features={
                      new Date(ActivityDate).toDateString() || "Thu Dec 26 2024"
                    }
                  />
                  <ActivityAttribute
                    image={Themes}
                    className="text-[black]"
                    features={Theme || "Winter"}
                    title="Theme"
                  />
                  <ActivityAttribute
                    image={KidBlack}
                    features={FocusAge || "Toddler"}
                    title="Difficulty"
                  />
                  <ActivityAttribute
                    image={TimerBlack}
                    features={SetUpTime || "5 Min"}
                    title="Set up Time"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Learning Areas
                </div>

                <div className="items-center h-fit hover:h-full overflow-y-hidden overflow-x-scroll scrollbar-hidden w-full justify-start flex flex-row gap-1">
                  {LearningAreaIcons && LearningAreaIcons.length > 0 ? (
                    LearningAreaIcons.map((skill, index) => {
                      // Extract the skill title
                      const skillTitle = skill.children[0]?.text;
                      const icon = getIconForSkill(skillTitle); // Get the icon URL dynamically
                      const iconSrc = icon?.src || SpeechLanguageActivity; // Replace with your fallback icon path

                      return (
                        <Image
                          key={index}
                          src={iconSrc} // Using the icon image URL here
                          alt={skillTitle}
                          width={32}
                          title={skillTitle}
                          height={32}
                          className="w-8 h-8 cursor-pointer text-opacity-50 hover:opacity-100 duration-150 ease-out" // Set the size for the image
                        />
                      );
                    })
                  ) : (
                    <p>No skills available.</p> // Fallback message if no skills are found
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Skills{" "}
                </div>
                <div className="text-[#0a1932] px-0 text-[16px] font-normal font-fredoka list-disc leading-none">
                  <span
                    className="prose leading-[14px] marker:text-[#0a1932]"
                    dangerouslySetInnerHTML={{ __html: Skills }}
                  />
                </div>
              </div>
            </div>
            <div className="items-center px-4 hidden lg:px-0 w-full lg:min-w-[600px] justify-center lg:flex flex-col gap-2">
              <div className="px-4 mb-6 md:hidden flex w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Check Activity Resources
                </div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      disabled={
                        !activity.Resources || activity.Resources.length === 0
                      }
                      className={`w-full clarabuttton flex md:hidden ${
                        activity.Resources && activity.Resources.length > 0
                          ? "bg-[#3f3a64] text-white"
                          : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      } text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white`}
                    >
                      Resources
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[96%] p-0 lg:max-w-[600px] max-h-[500px] overflow-y-scroll rounded-lg">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {activity.Resources &&
                          activity.Resources.length > 0 ? (
                            activity.Resources.map((resource) => {
                              return (
                                <ResourceCard
                                  key={resource.id}
                                  resource={resource}
                                />
                              );
                            })
                          ) : (
                            <p>No resources available.</p>
                          )}
                        </div>{" "}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              {Accordions.map((accordion, index) => (
                <Accordian
                  key={index}
                  title={accordion.Question}
                  description={accordion.Answer}
                />
              ))}
            </div>
          </div>

          <div className="claracontainer p-0 pb-24 flex flex-col justify-start items-start gap-8">
            <div className="claracontainer hidden lg:flex w-full flex-col px-4 lg:px-0 justify-start items-start gap-4">
              <div className="flex w-full flex-col justify-normal items-center gap-2">
                <div className="text-[#0a1932] text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  {Title}
                </div>
                <div className="items-center w-full justify-center flex flex-col gap-2">
                  <ActivityAttribute
                    image={ActivityBlack}
                    features={
                      new Date(ActivityDate).toDateString() || "Thu Dec 26 2024"
                    }
                  />{" "}
                  <ActivityAttribute
                    image={Themes}
                    className="text-[black]"
                    features={Theme || "Winter"}
                    title="Theme"
                  />
                  <ActivityAttribute
                    image={KidBlack}
                    features={FocusAge || "Toddler"}
                    title="Difficulty"
                  />{" "}
                  <ActivityAttribute
                    image={TimerBlack}
                    features={SetUpTime || "5 Min"}
                    title="Set up Time"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Learning Areas
                </div>

                <div className="items-center overflow-x-scroll  scrollbar-hidden w-full justify-start flex flex-row gap-1">
                  {LearningAreaIcons && LearningAreaIcons.length > 0 ? (
                    LearningAreaIcons.map((skill, index) => {
                      // Extract the skill title
                      const skillTitle = skill.children[0]?.text;
                      const icon = getIconForSkill(skillTitle); // Get the icon URL dynamically
                      const iconSrc = icon?.src || SpeechLanguageActivity; // Replace with your fallback icon path

                      return (
                        <Image
                          key={index}
                          src={iconSrc} // Using the icon image URL here
                          alt={skillTitle}
                          width={32}
                          title={skillTitle}
                          height={32}
                          className="w-8 h-8 cursor-pointer text-opacity-50 hover:opacity-100 duration-150 ease-out" // Set the size for the image
                        />
                      );
                    })
                  ) : (
                    <p>No skills available.</p> // Fallback message if no skills are found
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col justify-star items-start gap-2">
                <div className="text-[#0a1932]  text-start justify-start items-start w-full font-fredoka font-semibold text-[24px] md:text-[28px] lg:text-[28px]">
                  Skills{" "}
                </div>

                <div className="text-[#0a1932] px-0 text-[16px] font-normal font-fredoka list-disc leading-none">
                  <span
                    className="prose leading-[14px] marker:text-[#0a1932]"
                    dangerouslySetInnerHTML={{ __html: Skills }}
                  />
                </div>
              </div>
            </div>
            <div className="items-center px-4 lg:hidden lg:px-0 w-full lg:min-w-[600px] justify-center flex flex-col gap-2">
              <div className="px-4 mb-6 md:hidden flex w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Check Activity Resources
                </div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      disabled={
                        !activity.Resources || activity.Resources.length === 0
                      }
                      className={`w-full clarabuttton flex md:hidden ${
                        activity.Resources && activity.Resources.length > 0
                          ? "bg-[#3f3a64] text-white"
                          : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      } text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white`}
                    >
                      Resources
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[96%] p-0 lg:max-w-[800px] max-h-[500px] overflow-y-scroll rounded-lg">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {activity.Resources &&
                          activity.Resources.length > 0 ? (
                            activity.Resources.map((resource) => {
                              return (
                                <ResourceCard
                                  key={resource.id}
                                  resource={resource}
                                />
                              );
                            })
                          ) : (
                            <p>No resources available.</p>
                          )}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              {Accordions.map((accordion, index) => (
                <Accordian
                  key={index}
                  title={accordion.Question}
                  description={accordion.Answer}
                />
              ))}
            </div>

            <div className="flex w-full flex-col py-6 md:py-0 justify-start items-start gap-2">
              <div className="w-full md:flex hidden justify-between items-center p-6 bg-white rounded-xl shadow">
                <ChevronLeft />
                <div className="text-center text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Activity date <br />
                  {new Date(ActivityDate).toLocaleDateString("en-GB")}
                </div>
                <ChevronRight />
              </div>
              <div className="px-4 md:flex hidden w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Check Activity Resources
                </div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      disabled={
                        !activity.Resources || activity.Resources.length === 0
                      }
                      className={`w-full clarabuttton flex ${
                        activity.Resources && activity.Resources.length > 0
                          ? "bg-[#3f3a64] text-white"
                          : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      } text-sm font-normal font-fredoka uppercase leading-[18px] tracking-wide rounded-2xl shadow border-2 border-white`}
                    >
                      Resources
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#EAEAF5] max-w-[600px] flex flex-col justify-between max-h-[600px] lg:max-w-[800px] lg:max-h-[600px] min-h-[400px] overflow-y-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                    <DialogHeader>
                      <div className="flex flex-row justify-center items-center w-full">
                        <DialogTitle>
                          <div className="text-center">
                            <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                              Check Resources for
                            </span>{" "}
                            <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                              {Title}
                            </span>
                          </div>
                        </DialogTitle>
                      </div>
                      <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {activity.Resources &&
                          activity.Resources.length > 0 ? (
                            activity.Resources.map((resource) => {
                              return (
                                <ResourceCard
                                  key={resource.id}
                                  resource={resource}
                                />
                              );
                            })
                          ) : (
                            <p>No resources available.</p>
                          )}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Print Activity{" "}
                </div>
                {/* <PrintDocument activityid={id} />{" "} */}
              </div>

              <div className="md:flex hidden px-4 w-full py-6 bg-white rounded-xl shadow gap-3 flex-col justify-center items-center">
                <div className="text-[#3f3a64] text-base font-semibold font-montserrat uppercase leading-[19px]">
                  Mark Activity as Complete{" "}
                </div>
                {/* <MarkActivityCompleteForm passactivityId={matchedActivityId} /> */}
              </div>
            </div>
          </div>

          <div className="flex md:hidden max-w-full overflow-hidden z-50 shadow-upper pt-2 pb-4 px-2 mb-[72px] rounded-t-[8px] justify-between items-center gap-1 bg-[white] shadow-sm fixed bottom-0 left-0 w-full">
            {/* <PrintDocument activityid={id} /> */}
            {/* <MarkActivityCompleteForm passactivityId={matchedActivityId} /> */}
          </div>
        </div>
      </section>
    </>
  );
}
