"use client";

import { getUserDataByEmail } from "@/lib/hygraph";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PlayForLife({ fetchedData }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);
  // const videoUrl = standardPages.featuredVideo[0].url;

  return (
    <>
      {/* New Component */}
      <section
        id="video"
        className="w-full h-auto bg-[#0097cb] items-center justify-center py-8 lg:py-16 flex flex-col gap-[20px] md:flex-row"
      >
        <div className="claracontainer px-4 md:px-2 lg:px-4 items-start justify-start-4 w-full flex flex-col md:flex-col lg:flex-row xl:flex-row overflow-hidden gap-8">
          <div className="w-full flex justify-center items-center h-auto">
            <div className="w-full min-h-[240px] lg:w-[400px] h-full lg:h-[340px] xl:w-[500px] animate-fadeIn animate-delay-500 duration-300">
              <video
                controls
                autoPlay
                loop
                muted
                className="object-cover min-h-[240px] max-h-[300px] md:min-h-[440px] lg:max-h-[340px] lg:h-[340px] rounded-[24px] w-full md:w-full lg:w-[540px] h-full"
              >
                <source src={fetchedData.featuredVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="flex-col button flex justify-center items-start">
            <div className="flex w-full flex-col justify-start items-start script">
              <div className="text-white clarascript animate-fadeIn duration-300">
                Life-Defining Early Learning Through Play{" "}
              </div>
              <div className="w-full heading flex flex-col justify-start gap-[20px] items-start">
                <div>
                  <span className="text-[#3F3A64] capitalize claraheading">
                    Play{" "}
                  </span>
                  <span className="text-white capitalize claraheading">
                    for Life
                  </span>
                </div>
                <div className="w-auto h-auto text-white  clarabodyTwo">
                  {/* We created Kindi to empower both parents and professionals
                  with essential developmental tools to unlock young
                  children&apos;s full potential. Our ultimate goal is to
                  enhance the life prospects, prosperity, and well-being of
                  future generations through the transformative power of play.
                  Early years learning is a continuous journey, and Kindi is
                  your reliable companion, ensuring a smooth, fulfilling, and
                  fruitful path for a lifetime of achievement and joy.
                  We&apos;ve developed a comprehensive suite of tools to
                  simplify and streamline this journey, tailored to the demands
                  of our increasingly busy and fast-paced world. With our early
                  years learning app packed with resources, you have everything
                  you need to customize a unique learning path for your child
                  amidst your other commitments. */}
                  <p>{fetchedData[0].playForLife}</p>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <Button className="bg-red hover:bg-purple text-white clarabutton px-6 md:px-12 py-3 rounded-[16px] animate-fadeIn animate-delay-4500">
                {user && hygraphUser ? "Upgrade" : "Get Started"}
              </Button>
            </div>
            {/* <div className="w-auto py-2 h-auto">
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
