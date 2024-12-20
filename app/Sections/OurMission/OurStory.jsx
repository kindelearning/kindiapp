"use client";

import { getUserDataByEmail } from "@/lib/hygraph";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function OurStory({ fetchedData }) {
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
  return (
    <>
      <section className="w-full h-auto bg-[#EEBA00] items-center justify-center py-4 flex flex-col gap-[20px] md:flex-row">
        <div className="claracontainer px-4 md:px-0 lg:px-4 py-8 md:py-8 xl:py-12 w-full flex flex-col md:flex-col lg:flex-row xl:flex-row overflow-hidden gap-8">
          <div className="w-full flex justify-center items-center h-auto">
            <div className="w-full lg:w-[400px] xl:w-[500px] h-auto animate-fadeIn animate-delay-500">
              {/* <Image alt="Kindi" src={HowItWorkVideo} className="w-full" /> */}
              <video
                controls
                autoPlay
                loop
                muted
                className="object-cover max-h-[260px] md:min-h-[440px] lg:max-h-[360px] rounded-[24px] w-full md:w-full lg:w-[540px] h-full"
              >
                <source src="preloader.mp4" type="video/mp4" /> Your browser
                does not support the video tag.
              </video>
            </div>
          </div>
          <div className="flex-col flex justify-center body items-start">
            <div className="flex w-full flex-col script justify-start items-start ">
              <div className="text-white clarascript animate-fadeIn animate-delay-150">
                Life-Defining Early Learning Through Play{" "}
              </div>
              <div className="w-full flex heading flex-col justify-start items-start">
                <div>
                  <span className="text-[#3F3A64] capitalize animate-fadeIn animate-delay-150 claraheading">
                    Our{" "}
                  </span>
                  <span className="text-white capitalize animate-fadeIn animate-delay-150 claraheading">
                    Story
                  </span>
                </div>
                {/* <div className="w-auto h-auto text-white animate-fadeIn animate-delay-150 font-montserrat"> */}
                <div className="w-auto h-auto text-white clarabodyTwo animate-fadeIn animate-delay-150 ">
                  {/* We weren&apos;t always child development experts. We remember
                  the struggle of wanting the best for our kids during these
                  precious years but feeling lost, like we were failing at
                  parenting. Now, with over 20 years of combined experience
                  working directly with Early Years children and top ratings
                  from OFSTED, we&apos;re committed to ensuring no parent ever
                  feels overwhelmed and every child thrives through our guided
                  activities for brain stimulation and development. */}
                  <p>{fetchedData[0].ourStory}</p>
                </div>
              </div>
            </div>
            <div className="w-full flex">
              <Button className="bg-red hover:bg-purple text-white clarabutton px-6 md:px-12 py-3 rounded-[16px] animate-fadeIn animate-delay-4500">
                {user && hygraphUser ? "Upgrade" : "Get Started"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
