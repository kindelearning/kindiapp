"use client";

import {
  Achievement,
  KindiVector,
  Milestone,
  ProfileProgress,
} from "@/public/Images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, Menu, ShoppingBag } from "lucide-react";
import { HomeLight } from "@/public/Icons";
import { useEffect, useState } from "react";
import { NavMenu } from "@/app/constant/menu";
import { GoogleTranslate } from "../GoogleTranslate";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { getUserDataByEmail } from "@/lib/hygraph";
import { signOut } from "firebase/auth";
import Loading from "@/app/loading";

const LocalNavitem = ({
  Link = "#",
  IconSrc = <HomeLight />,
  Title = "NavTitle",
}) => {
  return (
    <a
      href={Link}
      className="w-full flex bg-[#ffffff] justify-between items-center py-2 px-4 rounded-lg"
    >
      <div className="flex items-center gap-2">
        <div className="icon-container w-5 h-5">
          <Image src={IconSrc} alt="Kindi" width={20} height={20} />
        </div>
        <span className="text-lg font-medium font-fredoka">{Title}</span>
      </div>
      <ChevronRight />
    </a>
  );
};

const MileStone = () => {
  return (
    <>
      <Link
        href="/profile/milestone"
        className="w-full h-[80px] bg-[#3f3d91] justify-center items-center gap-1 flex flex-col rounded-xl border-3 border-[#85829c]"
      >
        <Image src={Milestone} alt="Kindi" width={40} height={40} />
        <div className="text-center w-full text-white text-xs font-normal font-fredoka leading-none">
          MileStone
        </div>{" "}
      </Link>
    </>
  );
};

const Progress = () => {
  return (
    <>
      <Link
        href="/profile/progress"
        className="w-full h-[80px] bg-[#FF8E00] justify-center items-center gap-1 flex flex-col rounded-xl border-3 border-[#f9d09b]"
      >
        <Image src={ProfileProgress} alt="Kindi" width={40} height={40} />
        <div className="text-center w-full text-white text-xs font-normal font-fredoka leading-none">
          Progress
        </div>{" "}
      </Link>
    </>
  );
};

const Achievements = () => {
  return (
    <>
      <Link
        href="/profile/achievements"
        className="w-full h-[80px] bg-[#C42797] justify-center items-center gap-1 flex flex-col rounded-xl border-3 border-[#e4a9d3]"
      >
        <Image src={Achievement} alt="Kindi" width={40} height={40} />
        <div className="text-center w-full text-white text-xs font-normal font-fredoka leading-none">
          Achievements
        </div>{" "}
      </Link>
    </>
  );
};

const usePathname = () => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return pathname;
};

export default function LocalHeader() {
  const pathname = usePathname();
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

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/", // Optional: Redirect users to this URL after sign out
    });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <header className="top-0 w-full rounded- b-[12px] bg-red sticky z-40 dark:bg-dark-blue-100 flex flex-col justify-center items-center ">
      <section className="max-w-[1400px] claracontainer px-4 md:px-2 lg:px-4 flex flex-row justify-between items-center py-4 w-full">
        <Link href="/">
          <div className="logo">
            <Image
              src={KindiVector}
              alt="Logo"
              className="lg:w-[110px] w-[80px] md:w-[100px] lg:max-h-[50px]"
            />
          </div>
        </Link>

        {/* Hamburger icon for small screens */}
        <div className="lg:hidden clara flex items-center">
          <Sheet>
            <SheetTrigger>
              <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent className="bg-[#F5F5F5] pb-6 px-2 h-full">
              <SheetHeader className="h-full">
                {/* Custom Sidebar Item */}
                <section className="lg:hidden h-full flex flex-col w-full gap-2 items-start justify-between space-y-2 mt-4">
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col gap-1 justify-start items-start">
                      <div className="text-[#0a1932] clarabodyTwo font-medium font-fredoka leading-tight">
                        Quick Access
                      </div>
                      <div className="flex w-full flex-col gap-1 justify-normal items-center">
                        {NavMenu?.map((menuItem, index) => (
                          <LocalNavitem
                            key={index}
                            IconSrc={menuItem.icon}
                            Link={menuItem.link}
                            Title={menuItem.title}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-1 justify-start items-start">
                      <div className="text-[#0a1932] clarabodyTwo  font-fredoka leading-tight">
                        My Progress
                      </div>
                      <div className="grid grid-cols-3 w-full gap-1">
                        <MileStone />
                        <Progress />
                        <Achievements />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full">
                      <GoogleTranslate />
                    </div>
                    {hygraphUser ? (
                      <div className="flex w-full gap-2 justify-start items-center">
                        <div className="flex">
                          <Link
                            target="_blank"
                            className="flex flex-col justify-end items-end"
                            href="/shop/cart"
                          >
                            <p className="bg-[eaeaf5] border -mb-[8px] border-red text-red flex justify-center items-center text-[12px] z-12 w-[16px] h-[16px] font-fredoka rounded-full">
                              {/* {cart.length} */}
                            </p>
                            <ShoppingBag className="text-red w-[28px] h-[28px]" />
                          </Link>
                        </div>
                        <Button
                          onClick={handleSignOut}
                          className="bg-red hover:bg-hoverRed text-white clarabutton w-full"
                        >
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex w-full flex-col gap-1 justify-start items-start">
                        <Link
                          href="/auth/sign-in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <div className="bg-[#ffffff] py-2 w-full text-[12px] font-fredoka border-[black] text-[black] hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-2 rounded-[10px] transition duration-300 ease-in-out">
                            Sign in
                          </div>
                        </Link>
                        <Link
                          href="/auth/sign-up"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <div className="bg-red hover:bg-hoverRed text-[12px] font-fredoka text-white w-full py-2 px-[40px]  hover:text-white border-2 border-red rounded-[10px] transition duration-300 ease-in-out">
                            Get Started
                          </div>
                        </Link>
                      </div>
                    )}
                    {/* <div className="flex w-full flex-col gap-1 justify-start items-start">
                      <Link
                        href="/auth/sign-in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <div className="bg-[#ffffff] py-2 w-full text-[12px] items-center justify-center text-center font-fredoka border-[black] text-[black] hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-2 rounded-[10px] transition duration-300 ease-in-out">
                          Sign in
                        </div>
                      </Link>
                      <Link
                        href="/auth/sign-up"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <div className="bg-red hover:bg-hoverRed text-[12px] items-center justify-center text-center font-fredoka text-white w-full py-2 px-[40px]  hover:text-white border-2 border-red rounded-[10px] transition duration-300 ease-in-out">
                          Get Started
                        </div>
                      </Link>
                    </div> */}
                  </div>
                </section>
              </SheetHeader>
              <SheetDescription>#KindiLearning</SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
        {/* Navigation Links - Hidden on small screens */}
        <div className="hidden lg:flex flex-col md:flex-row gap-[16px] md:items-center md:justify-center w-full md:w-[max-content]">
          {NavMenu.map((menuItem, index) => (
            <a
              key={index}
              href={menuItem.link}
              className={`text-light-gray-500 gap-[6px] flex-row w-[max-content] dark:text-light-gray-500 text-lg font-semibold font-montserrat leading-6 flex items-center transition duration-300 ease-in-out ${
                pathname === menuItem.link ? "active" : ""
              }`}
            >
              <Image
                src={
                  pathname === menuItem.link
                    ? menuItem.activeIcon
                    : menuItem.icon
                }
                alt={`${menuItem.title} icon`}
                width={20}
                height={20}
                className="h-[14px] w-[14px] transition duration-300 ease-in-out"
              />
              <span
                className={`text-[14px] font-montserrat hover:text-[#000000] transition duration-300 ease-in-out ${
                  pathname === menuItem.link
                    ? "text-[#000000] hover:text-[#000000] underline underline-[red]"
                    : " text-[#757575] "
                }`}
                style={{ textDecorationColor: "#de4040" }}
              >
                {menuItem.title}
              </span>
            </a>
          ))}
        </div>

        <div className="hidden lg:flex space-x-4">
          <Link href="/auth/sign-in">
            <Button className="bg-[#ffffff] border-purple text-purple hover:bg-[#ffffff] hover:border-[#2b2b2b] hover:text-dark-blue-100 px-[40px] border-2 rounded-[16px] transition duration-300 ease-in-out">
              Sign in
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-red px-[40px] hover:text-white border-4 border-red hover:bg-hoverRed hover:border-hoverRed rounded-[16px] transition duration-300 ease-in-out">
              Sign Up
            </Button>
          </Link>
        </div>
      </section>
      {/* <div className="w-full bg-[#f5f5f5] h-[12px] rounded-t-[12px]"></div> */}
    </header>
  );
}
