"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  KindiHeart,
  ProfilePlaceHolderOne,
  progressImage01,
  progressImage02,
  progressImage03,
} from "@/public/Images";
import ReferralCard from "@/app/Sections/Profile/ReferralCard";
import { GraphQLClient, gql } from "graphql-request";
import Loading from "@/app/loading";
import Head from "next/head";
import { progressData } from "@/app/constant/menu";
import { getAllActivities, getUserDataByEmail } from "@/lib/hygraph";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const client = new GraphQLClient(HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_TOKEN}`,
  },
});

const ActivitiesCount = () => {
  const [totalActivities, setTotalActivities] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activities = await getAllActivities();
        setTotalActivities(activities.length); // Set the total number of activities
      } catch (error) {
        setError("Failed to fetch activities: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <SubBagde
        number={totalActivities}
        title="Total Activities"
        backgroundColor="#019acf"
        borderColor="#a4d2ea"
      />
    </>
  );
};

const GET_ACCOUNT_BY_EMAIL = gql`
  query GetAccountByEmail($email: String!) {
    account(where: { email: $email }) {
      id
      name
      username
      email
      profilePicture {
        url
      }
      isVerified
    }
  }
`;

const SubBagde = ({
  title = "title",
  number = "120",
  backgroundColor,
  borderColor,
}) => {
  return (
    <div
      className={`flex w-full flex-col md:flex-col lg:flex-row max-w-[240px] px-6 items-center gap-2  cursor-pointer  border-4 py-4 border-[${borderColor}] rounded-[12px] text-white`}
      style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
    >
      <div className="text-center text-white text-[56px] font-semibold font-fredoka leading-[60px]">
        {number}
      </div>
      <span className="w-full overflow-clip font-medium text-center text-white text-[16px] md:text-[20px] lg:text-[24px] leading-[18px] lg:leading-[26px] font-fredoka">
        {title}
      </span>
    </div>
  );
};

const SubProfileRoutes = ({
  title = "My Activities",
  image,
  iconBackgroundColor = "#f05c5c",
}) => {
  return (
    <div className="w-full min-w-[120px] md:min-w-[180px] md:min-h-[136px] lg:h-full rounded-[8px] h-full justify-start gap-1 max-w-[180px] min-h-[120px] cursor-pointer p-4 bg-white items-start inline-flex">
      <div className="justify-start items-center w-full gap-[20px] flex flex-col">
        <div
          className="w-[42px] flex justify-center p-2 items-center h-[42px] rounded-[12px]"
          style={{ backgroundColor: `#${iconBackgroundColor}` }}
        >
          <Image
            alt="Kindi"
            src={image || KindiHeart}
            className="w-[28px] h-[28px]"
          />
        </div>
        <div className="text-[#0a1932] text-center text-sm font-normal leading-tight font-fredoka">
          {title}
        </div>
      </div>
    </div>
  );
};

/**
 *
 * @param {MyActivity completed by User} param0
 * @returns
 */

const RemainingActivities = ({ userID }) => {
  const [totalActivities, setTotalActivities] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(0);
  const [loadingTotal, setLoadingTotal] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotalActivities = async () => {
      try {
        const activities = await getAllActivities();
        setTotalActivities(activities.length);
      } catch (error) {
        setError("Failed to fetch total activities: " + error.message);
      } finally {
        setLoadingTotal(false);
      }
    };

    fetchTotalActivities();
  }, []);

  useEffect(() => {
    const fetchCompletedActivities = async () => {
      try {
        // Fetch completed activities using the MyActivity component's logic
        const query = `
          query GetUserActivities($relationalFirst: Int, $where: AccountWhereUniqueInput!) {
            values: account(where: $where) {
              id
              username
              myActivity(first: $relationalFirst) {
                id
                title
                documentInStages(includeCurrent: true) {
                  id
                  stage
                  updatedAt
                  publishedAt
                }
              }
            }
          }
        `;

        const variables = {
          relationalFirst: 100, // Adjust this value based on your needs
          where: { id: userID }, // Replace with the current user's ID
        };

        const response = await fetch(HYGRAPH_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({ query, variables }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        } else {
          setCompletedActivities(result.data.values.myActivity.length);
        }
      } catch (error) {
        setError("Error fetching completed activities: " + error.message);
      } finally {
        setLoadingCompleted(false);
      }
    };

    fetchCompletedActivities();
  }, [userID]);

  if (loadingTotal || loadingCompleted) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const remainingActivities = totalActivities - completedActivities;

  return (
    <>
      <SubBagde
        number={remainingActivities}
        title="Remaining Activities"
        backgroundColor="#f5a623"
        borderColor="#f5d08e"
      />
    </>
  );
};

const MyActivity = ({ userID }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivities = async () => {
    const query = `
      query GetUserActivities($relationalFirst: Int, $where: AccountWhereUniqueInput!) {
        values: account(where: $where) {
          id
          username
          myActivity(first: $relationalFirst) {
            id
            title
            documentInStages(includeCurrent: true) {
              id
              stage
              updatedAt
              publishedAt
            }
          }
        }
      }
    `;

    const variables = {
      relationalFirst: 100, // Adjust this value based on your needs
      where: { id: userID }, // Replace with the current user's ID
    };

    try {
      const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();
      console.log("Result", result);

      if (result.errors) {
        throw new Error(result.errors[0].message);
      } else {
        setActivities(result.data.values.myActivity);
      }
    } catch (error) {
      setError("Error fetching activities: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [userID]);

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error) return <p>{error}</p>;
  const CompletedActivity = activities.length;
  return (
    <>
      <SubBagde
        number={CompletedActivity}
        title="Complete"
        backgroundColor="#029871"
        borderColor="#a5d2ce"
      />
    </>
  );
};

export default function ProgressSection() {
  // const [activities, setActivities] = useState([]); //Getting all the activities from Hygraph

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

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

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
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col px-0">
        {/* Topbar */}

        <div className="claracontainer py-4  w-full flex flex-col overflow-hidden gap-8">
          <div className="flex w-full px-4 h-[160px] flex-row justify-center gap-0 items-center relative">
            <Image
              alt="Kindi"
              src={progressImage01}
              className="cursor-pointer w-20 -mr-[32px] h-20"
            />
            {user && hygraphUser ? (
              // <Image
              //   alt="Kindi"
              //   src={hygraphUser.profilePicture?.url || ProfilePlaceHolderOne}
              //   width={100}
              //   height={100}
              //   className="cursor-pointer w-30 h-30 border-gradient-to-r from-pink-500 to-yellow-500 border-2 border-red rounded-full z-10"
              // />
              <div className="relative w-20 h-20 md:w-28 md:h-28 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
                  <Image
                    src={
                      hygraphUser.profilePicture?.url || ProfilePlaceHolderOne
                    }
                    alt="User DP"
                    width={100}
                    height={100}
                    className="w-[72px] h-[72px] md:w-32 md:h-32 object-cover overflow-clip rounded-full"
                  />
                </div>
              </div>
            ) : (
              <Image
                alt="Kindi"
                src={progressImage02}
                width={100}
                height={100}
                className="cursor-pointer w-30 rounded-full border-2 border-white z-10 h-30"
              />
            )}
            <Image
              alt="Kindi"
              src={progressImage03}
              className="cursor-pointer w-20 -ml-[32px] h-20"
            />
          </div>
          <>
            {hygraphUser ? (
              <div className="flex gap-2 px-4 lg:px-0 overflow-x-scroll scrollbar-hidden w-full">
                <ActivitiesCount />
                <RemainingActivities userID={hygraphUser.id} />
                <MyActivity userID={hygraphUser.id} />
              </div>
            ) : (
              <p>Not Found...</p>
            )}
            {/* <div className="flex gap-2 px-4 lg:px-0 overflow-x-scroll scrollbar-hidden w-full"></div> */}
          </>
          <div className="flex w-full px-2 lg:px-0 justify-start items-center gap-2 flex-wrap">
            {progressData.map((card, index) => (
              <SubProfileRoutes
                key={card.id}
                image={card.icon}
                iconBackgroundColor={card.backgroundColor}
                title={card.title}
              />
            ))}
          </div>
          <div className="claracontainer px-0 w-full flex flex-col justify-start items-start overflow-hidden gap-8">
            <ReferralCard />
          </div>
        </div>
      </section>
    </>
  );
}