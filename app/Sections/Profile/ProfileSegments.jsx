"use client";

import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { getUserDataByEmail } from "@/lib/hygraph";
import { useAuth } from "@/lib/useAuth";
import {
  Achievement,
  Milestone,
  ProfileDP,
  ProfilePlaceHolderOne,
  ProfileProgress,
  VerifiedIcon,
} from "@/public/Images";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BadgeSection } from "..";

export default function ProfileSegments() {
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

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );

  return (
    <>
      <Head>
        <title>Profile - Kindilearning</title>
        <meta name="description" content="Your profile page on Kindilearning" />
        <meta property="og:title" content="Profile - Kindilearning" />
        <meta
          property="og:description"
          content="Your profile page on Kindilearning"
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://kindilearning.com/profile" />
        <meta property="og:site_name" content="Kindilearning" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Profile - Kindilearning" />
        <meta
          name="twitter:description"
          content="Your profile page on Kindilearning"
        />
        <meta name="twitter:image" content="/images/logo.png" />
      </Head>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col md:flex-row px-0">
        {/* Topbar */}
        <div className="w-full flex pt-4 pb-7 md:hidden bg-red">
          <div className="text-center w-full text-white text-[20px] font-semibold font-fredoka leading-tight">
            Profile
          </div>
        </div>
        <div className="claracontainer bg-[#F5F5F5] md:bg-[#EAEAF5] -mt-4 rounded-t-[12px] z-2 lg:m-12 px-4 py-6 rounded-xl md:px-2 lg:p-8 xl:p-12 w-full flex flex-col overflow-hidden gap-[20px]">
          {/* Top Profile Card */}
          <div className="w-full flex bg-[white] rounded-[24px] p-2 md:p-4 justify-start items-start gap-[4px] lg:gap-[12px] lg:items-center">
            <div className="w-fit lg:max-w-[160px] lg:w-full items-center flex justify-start">
              {user && hygraphUser ? (
                <>
                  <div className="relative w-20 h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                    <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
                      <Image
                        src={
                          hygraphUser.profilePicture?.url ||
                          ProfilePlaceHolderOne
                        }
                        alt="User DP"
                        width={100}
                        height={100}
                        className="w-[72px] h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={ProfileDP}
                  alt="Logo"
                  className="rounded-full border-2 lg:w-full lg:h-full border-red w-[48px] h-[48px]"
                />
              )}
            </div>

            <div className="w-full gap-4 flex flex-col justify-center">
              <div className="flex flex-row justify-between items-start w-full">
                {user && hygraphUser ? (
                  <div className="flex flex-col w-full justify-start items-start">
                    <div className="flex gap-1 items-center w-full justify-start">
                      <h2 className="text-[#029871] text-[20px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold font-fredoka leading-tight">
                        {hygraphUser.name || "Kindi Learner"}
                      </h2>
                      {hygraphUser.isVerified && (
                        <span
                          className="ml-2 text-[#255825]"
                          title="Verified User"
                        >
                          <Image
                            src={VerifiedIcon}
                            alt="VerifiedIcon"
                            className="w-[20px] h-[20px] lg:h-[30px] lg:w-[30px]"
                          />
                        </span>
                      )}
                    </div>
                    <p className="font-fredoka text-[12px] lg:text-[20px]">
                      Email: {hygraphUser.email}
                    </p>
                  </div>
                ) : (
                  <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                    Kindi Learner
                  </h2>
                )}
                {/* Trigger for the Edit Profile Popup */}
                <Link
                  href="/profile/update"
                  className="hidden md:flex"
                  target="_blank"
                >
                  <Badge
                    className="text-[10px] md:text-[16px] cursor-pointer"
                    variant="outline"
                  >
                    Edit
                  </Badge>
                </Link>
              </div>
              <div className="flex flex-col w-full gap-1 items-start justify-start">
                <div className="flex flex-row w-full justify-start items-center gap-2">
                  {/* Trigger for the Level Popup */}
                  {user && hygraphUser ? (
                    <>{/* <MyLevel userID={hygraphUser.id} /> */}</>
                  ) : null}
                  <Link
                    href="/profile/update"
                    className="flex md:hidden"
                    target="_blank"
                  >
                    <Badge
                      className="text-[10px] md:text-[16px] cursor-pointer"
                      variant="outline"
                    >
                      Edit
                    </Badge>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Quick Navigation for the Page */}
          <div className="claracontainer px-0 w-full flex flex-row justify-start overflow-x-scroll scrollbar-hidden items-start overflow-hidden gap-2">
            <Link target="_blank" href="/profile/milestone">
              <BadgeSection
                icon={Milestone}
                backgroundColor="#3F3D91"
                borderColor="#9998c2"
                title="Milestone"
              />
            </Link>
            <Link target="_blank" href="/profile/progress">
              <BadgeSection
                icon={ProfileProgress}
                title="Progress"
                backgroundColor="#FF8E00"
                borderColor="#f2c99b"
              />
            </Link>
            <Link target="_blank" href="/profile/achievements">
              <BadgeSection
                icon={Achievement}
                title="Achievement"
                backgroundColor="#C42797"
                borderColor="#dc8dc5"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
