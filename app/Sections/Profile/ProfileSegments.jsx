"use client";

import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { getUserDataByEmail } from "@/lib/hygraph";
import { useAuth } from "@/lib/useAuth";
import {
  Achievement,
  Bag,
  ConnectPartner,
  Email,
  Kid,
  Milestone,
  Partner,
  Payments,
  ProfileDP,
  ProfilePlaceHolderOne,
  ProfileProgress,
  ProfileSettingIcon,
  Support,
  TnC,
  User,
  VerifiedIcon,
} from "@/public/Images";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  BadgeSection,
  ContactForm,
  MyLevel,
  MyProfileRoutes,
  PartnerList,
  PaymentMethodsList,
  PopupFooter,
  ProductCard,
  ReferralForm,
  SettingCard,
} from "..";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { data } from "@/app/constant/menu";
import { Button } from "@/components/ui/button";
import ConnectAccountForm from "./ConnectAccountForm";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase/firebaseConfig";
import { StockImages } from "@/app/constant/profile";
import { Input } from "@/components/ui/input";

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * StockImages.length);
  return StockImages[randomIndex].url;
};

const RandomImageComponent = () => {
  const randomImage = getRandomImage();

  return (
    <div className="relative w-20  -mx-[32px] h-20 lg:w-36 lg:h-36 p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
      <div className="w-full h-full bg-white rounded-full flex overflow-clip items-center justify-center">
        <Image
          src={randomImage}
          alt="Random Profile Placeholder"
          className="w-[72px] h-[72px] lg:w-36 lg:h-36 object-cover overflow-clip rounded-full"
        />
      </div>
    </div>
  );
};

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const CONNECT_PAYMENT_METHOD_TO_USER_MUTATION = `
  mutation ConnectPaymentMethodToUser($userId: ID!, $paymentMethodId: ID!) {
  updateAccount(
    where: { id: $userId }
    data: {
      myPaymentMethod: {
        connect: { where: { id: $paymentMethodId } }
      }
    }
  ) {
    id
  }
}
`;

const GET_PAYMENT_METHODS_QUERY = `
  query GetPaymentMethods($userId: ID!) {
    account(where: { id: $userId }) {
      myPaymentMethod {
        id
        name
        number
        expiryDate
        cvv
      }
    }
  }
`;
const PaymentMethodForm = ({ userId }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      number: parseInt(number), // Ensure the number is an integer
      expiryDate,
      cvv: parseInt(cvv), // Ensure CVV is an integer
    };

    await createAndPublishPaymentMethod(data);
  };

  const createAndPublishPaymentMethod = async (data) => {
    try {
      // Step 1: Create PaymentMethod
      const createResponse = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
              mutation CreatePaymentMethod($data: PaymentMethodCreateInput!) {
                createPaymentMethod(data: $data) {
                  id
                }
              }
            `,
          variables: { data },
        }),
      });
      const createResult = await createResponse.json();
      const paymentMethodId = createResult.data.createPaymentMethod.id;

      // Step 2: Publish PaymentMethod
      const publishResponse = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
              mutation PublishPaymentMethod($id: ID!) {
                publishPaymentMethod(where: { id: $id }, to: PUBLISHED) {
                  id
                }
              }
            `,
          variables: { id: paymentMethodId },
        }),
      });
      const publishResult = await publishResponse.json();

      // Step 3: Connect the created Payment Method to the user's account
      const connectResponse = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({
          query: CONNECT_PAYMENT_METHOD_TO_USER_MUTATION,
          variables: {
            userId,
            paymentMethodId,
          },
        }),
      });
      const connectResult = await connectResponse.json();

      if (publishResult.errors) {
        throw new Error("Error publishing payment method");
      }

      setMessage("Payment method added and published successfully!");
    } catch (error) {
      console.error("Error creating or publishing payment method:", error);
      setMessage("Error adding payment method.");
    }
  };

  return (
    <form
      className="flex flex-col gap-2 w-full justify-center items-start"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <Input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Card Number"
        required
      />
      <Input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        required
      />
      <Input
        type="text"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        placeholder="CVV"
        required
      />
      <button
        className="clarabutton py-2 bg-red hover:bg-hoverRed text-white"
        type="submit"
      >
        Submit Payment Method
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};
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

  const auth = getAuth(app); // Use the initialized app here

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User successfully logged out");

      // Redirect to the home or login page after logging out
      router.push("/p");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <head>
        <title>Profile - Kindilearning</title>
        <meta name="description" content="Your profile page on Kindilearning" />
      </head>
      <section className="w-full h-auto bg-[#F5F5F5] md:bg-[#EAEAF5] items-center justify-center flex flex-col px-0">
        {/* Topbar */}
        <div className="w-full flex pt-4 pb-7 bg-red">
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
                          hygraphUser.myAvatar.profileAvatar.url ||
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
                <RandomImageComponent />
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
                  <div className="flex w-full flex-col justify-start items-start gap-2">
                    <h2 className="text-[#029871] text-[24px] md:text-[28px] lg:text-[32px] xl:text-[40px] font-semibold  font-fredoka leading-tight">
                      Kindi Learner
                    </h2>
                    <p className="font-fredoka text-[12px] lg:text-[20px]">
                      <Link href="/auth/sign-in" className="text-red">
                        Login&nbsp;
                      </Link>
                      to user more feature
                    </p>
                  </div>
                )}
                {/* Trigger for the Edit Profile Popup */}
                <Link href="/profile/update" className="hidden md:flex">
                  <Badge
                    className="text-[10px] rounded-full md:text-[16px] cursor-pointer"
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
                    <MyLevel userID={hygraphUser.id} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {/* Quick Navigation for the Page */}
          <div className="claracontainer px-0 w-full flex flex-row justify-start overflow-x-scroll scrollbar-hidden items-start overflow-hidden gap-2">
            <Link href="/profile/milestone">
              <BadgeSection
                icon={Milestone}
                backgroundColor="#3F3D91"
                borderColor="#9998c2"
                title="Milestone"
              />
            </Link>
            <Link href="/profile/progress">
              <BadgeSection
                icon={ProfileProgress}
                title="Progress"
                backgroundColor="#FF8E00"
                borderColor="#f2c99b"
              />
            </Link>
            <Link href="/profile/achievements">
              <BadgeSection
                icon={Achievement}
                title="Achievement"
                backgroundColor="#C42797"
                borderColor="#dc8dc5"
              />
            </Link>
          </div>
          {/* The individual Tabs for Profile Page */}
          <div className="flex w-full justify-center items-center gap-4 flex-col">
            {/* Kids Profile Model */}
            <Dialog className="bg-[#EAEAF5] w-full items-start claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Kid}
                  iconBackgroundColor="#029871"
                  title="Kids Profile"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-w-[96%] items-start max-h-[70%] scrollbar-hidden overflow-scroll p-0 overflow-x-hidden  rounded-[16px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                          My{" "}
                        </span>
                        <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                          Profile
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full min-h-[300px] pb-24 px-4 claracontainer gap-4 flex-col justify-center items-start">
                  {user && hygraphUser ? (
                    <PartnerList userId={hygraphUser.id} />
                  ) : (
                    <> No Partners Associated with this account</>
                  )}
                </DialogDescription>
                <DialogFooter className="sticky rounded-t-[16px] bottom-0 m-0 w-full ">
                  <DialogClose className="w-full">
                    <PopupFooter PrimaryText="Save and Continue" />
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Orders Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Bag}
                  iconBackgroundColor="#3F3A64"
                  title="Orders"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-w-[96%] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          My{" "}
                        </span>
                        <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          Order
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <div className="grid grid-cols-1 md:grid-cols-4 h-auto w-full claracontainer gap-4">
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                    <ProductCard data={data} />
                  </div>
                </DialogDescription>
                <DialogFooter className="sticky  rounded-t-[16px] bottom-0 m-0 w-full bg-[#ffffff]">
                  <PopupFooter PrimaryText="Save and Continue" />
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Connect a partner Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Partner}
                  iconBackgroundColor="#FF8E00"
                  title="Connect a Partner"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] scrollbar-hidden max-w-[96%] lg:max-w-[800px] lg:pb-12 max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          Connect{" "}
                        </span>
                        <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          A Partner
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <div className="flex flex-col md:flex-row px-2 md:px-6  max-w-[1000px] justify-center items-start claracontainer gap-4">
                    <div className="flex w-full max-w-[20%]">
                      <Image
                        alt="Kindi"
                        src={ConnectPartner}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-start items-start gap-4">
                      <div className="text-[#757575] text-[16px] leading-[18px] md:text-2xl md:leading-[26px] font-normal font-fredoka ">
                        Securely grant access to your child&apos;s progress,
                        activities, and milestones, ensuring that both parents
                        can stay up-to-date and involved in every step of their
                        learning. Simply invite your partner to join, and
                        they&apos;ll gain shared access to the Kindi
                        experience—helping you both support your little one
                        together.
                      </div>
                      {user && hygraphUser ? (
                        <ConnectAccountForm userId={hygraphUser.id} />
                      ) : (
                        <div className="claracontainer">
                          <Link href="/auth/sign-up" className="clarabutton">
                            Please Login to use this feature!
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>
            {/* Payment Method Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Payments}
                  iconBackgroundColor="#019ACF"
                  title="Payment Method"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] max-w-[96%] max-h-[70%] scrollbar-hidden overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                <DialogHeader className="p-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <div className="text-center">
                        <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          Payment{" "}
                        </span>
                        <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                          Methods
                        </span>
                      </div>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-4 lg:px-6 py-6 w-full claracontainer gap-4">
                    {user && hygraphUser ? (
                      <PaymentMethodsList userId={hygraphUser.id} />
                    ) : (
                      <div className="claracontainer">
                        <Link href="/auth/sign-up" className="clarabutton">
                          Please Login to use this feature!
                        </Link>
                      </div>
                    )}
                  </div>

                  <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
                    <DialogTrigger className="w-full">
                      <Button className="bg-transparent text-black hover:bg-white hover:border-black ">
                        Add new Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#EAEAF5] max-w-[96%] lg:max-w-[800px] max-h-[70%] overflow-scroll p-0 overflow-x-hidden rounded-[16px] w-full claracontainer">
                      <DialogHeader className="p-4">
                        <div className="flex flex-row justify-center items-center w-full">
                          <DialogTitle>
                            <div className="text-center">
                              <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                Add New{" "}
                              </span>
                              <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                                Payment Method
                              </span>
                            </div>
                          </DialogTitle>
                        </div>
                      </DialogHeader>
                      <DialogDescription className="flex w-full px-4 pb-12 claracontainer flex-col justify-start items-center">
                        {user && hygraphUser ? (
                          <PaymentMethodForm userId={hygraphUser.id} />
                        ) : (
                          <p>id not found</p>
                        )}
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </DialogDescription>
                <DialogFooter className="sticky bottom-0 m-0 w-full bg-[#ffffff]">
                  <DialogClose className="w-full">
                    <PopupFooter PrimaryText="Save and Continue" />
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Settings Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={ProfileSettingIcon}
                  iconBackgroundColor="#C42797"
                  title="Settings"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] w-full lg:max-w-[1000px] lg:w-[1000px] max-h-[70%] scrollbar-hidden overflow-scroll p-0 overflow-x-hidden rounded-[16px] claracontainer">
                <DialogHeader className="flex pt-4">
                  <div className="flex flex-row justify-center items-center w-full">
                    <DialogTitle>
                      <span className="text-center text-red text-4xl font-semibold font-fredoka capitalize  ">
                        My{" "}
                      </span>
                      <span className="text-center text-[#3f3a64] text-4xl font-semibold font-fredoka capitalize  ">
                        Settings
                      </span>
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="flex w-full px-4 claracontainer flex-col justify-start items-center">
                  <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
                    <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
                      <div className="claracontainer w-full flex flex-col overflow-hidden gap-4">
                        {/* Profile Edit */}
                        {user && hygraphUser ? (
                          <>
                            <Link href="/profile/edit">
                              <SettingCard
                                Value={hygraphUser.name}
                                image={User}
                                title="Full Name"
                              />
                            </Link>
                            <SettingCard
                              disabled
                              Value={hygraphUser.email}
                              image={Email}
                              title="Email"
                            />
                            <Link href="/p/tnc">
                              <SettingCard
                                Value="Term & Condition"
                                image={TnC}
                                title="Kindi's Learning"
                              />
                            </Link>
                          </>
                        ) : (
                          <SettingCard
                            Value="No Name Provided"
                            image={User}
                            title="Full Name"
                          />
                        )}
                      </div>
                    </div>
                  </section>
                </DialogDescription>
              </DialogContent>
            </Dialog>
            {/* Help Center Model */}
            <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
              <DialogTrigger className="w-full">
                <MyProfileRoutes
                  image={Support}
                  iconBackgroundColor="#3F3D91"
                  title="Help Center"
                />
              </DialogTrigger>
              <DialogContent className="bg-[#EAEAF5] w-full lg:max-w-[1000px] lg:w-[1000px] overflow-y-scroll scrollbar-hidden p-0 overflow-x-hidden rounded-[16px] claracontainer">
                <DialogHeader>
                  <DialogTitle>
                    <div className="text-center pt-4">
                      <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                        Help{" "}
                      </span>
                      <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                        Center
                      </span>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <section className="w-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
                      <div className="flex flex-col gap-4 justify-center items-center w-full">
                        <ContactForm />
                        <Link
                          target="_blank"
                          href="/p/faq"
                          className="text-center px-4 w-full text-[#3f3a64] clarabodyTwo "
                        >
                          <MyProfileRoutes
                            image={Support}
                            iconBackgroundColor="#3F3D91"
                            title="Check FAQ's"
                          />
                        </Link>
                      </div>
                    </section>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          {/* Signout Button */}
          <div className="w-full justify-start items-center flex">
            <Button
              className="clarabutton max-w-[300px] bg-red hover:bg-hoverRed"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
          {/* Reffereal Card Section */}
          <div className="claracontainer px-0 w-full flex flex-col justify-start items-start overflow-hidden gap-8">
            <ReferralForm />
          </div>
        </div>
      </section>
    </>
  );
}
