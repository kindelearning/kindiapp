"use client";

import { useState, useEffect } from "react";
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
import {
  PartnerBulb,
  ConnectPartner,
  ProfilePlaceHolderOne,
} from "@/public/Images";
import { getHygraphPartners, getUserDataByEmail } from "@/lib/hygraph";
import { useAuth } from "@/lib/useAuth";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ConnectAccountForm from "./ConnectAccountForm";
import Link from "next/link";

export default function PartnerList({ userId }) {
  const [partners, setPartners] = useState([]);
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/sign-up"); // Redirect to login if not authenticated
    }
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }

    // Fetch partners data for the current user
    const fetchPartners = async () => {
      const partnerData = await getHygraphPartners(userId);
      setPartners(partnerData);
    };

    if (userId) fetchPartners();
  }, [userId, user, loading, router]);

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <>
      <div className="flex w-full claracontainer gap-4 flex-col justify-start items-start">
        {/* Partner Popup header */}
        <div className="flex justify-between w-full items-center">
          <div className="text-black text-start text-[20px] md:text-[28px] font-semibold font-fredoka">
            Profiles
          </div>
          <div className="text-black text-start text-[20px] md:text-[28px] font-semibold font-fredoka ">
            {partners.length}/5
          </div>
        </div>
        {/* Partners Popup Cards */}

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full claracontainer gap-4">
          {partners.length > 0 ? (
            <>
              {partners.map((partner) => (
                <div
                  className="w-full flex flex-row justify-between items-center p-2 bg-white rounded-xl"
                  key={partner.id}
                >
                  <div className="flex flex-row gap-2 w-full justify-start items-center">
                    <div className="w-16 h-16 overflow-clip flex justify-center items-center">
                      {partner.profilePicture ? (
                        <Image
                          src={partner.profilePicture?.url}
                          alt="Profile Image"
                          width={64}
                          height={64}
                          className="min-w-16 min-h-16 object-cover rounded-full"
                        />
                      ) : (
                        <Image
                          src={ProfilePlaceHolderOne}
                          alt="Profile Image"
                          width={64}
                          height={64}
                          className="min-w-16 min-h-16 object-cover rounded-full"
                        />
                      )}
                    </div>
                    <div className="w-full flex-col justify-start items-start inline-flex">
                      <div className="text-[#0a1932] w-full text-[28px] font-semibold font-fredoka leading-tight">
                        {partner.username
                          ? partner.username
                          : partner.email.split("@")[0]}
                      </div>
                      <div className="text-[#757575] w-full clarabodyTwo">
                        {partner.dateOfBirth
                          ? `Age: ${calculateAge(partner.dateOfBirth)}`
                          : "DOB not provided"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No partner information available.</p>
          )}
          <Dialog className="bg-[#EAEAF5] w-full rounded-[28px] claracontainer">
            <DialogTrigger className="w-full">
              <div
                className={`w-full min-h-[90px] flex flex-row justify-center items-center p-2 bg-white rounded-xl
                      ${
                        partners.length >= 5
                          ? "opacity-50 cursor-none pointer text-black pointer-events-none"
                          : "cursor-pointer text-red"
                      }`}
                onClick={() => {
                  if (partners.length < 5) {
                    console.log("New Profile Clicked");
                  }
                }}
              >
                <Plus className="text-red" /> New Profile
              </div>
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
                    <div className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize  ">
                      Get $20
                    </div>{" "}
                    <div className="text-[#757575] text-[16px] md:text-2xl font-medium font-fredoka ">
                      Invite a Partner or friends, family, coworkers,
                      neighbours, and your favourite barista to Brushlink. Every
                      time someone books and visits a new dentist through your
                      link, you both get $20.
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
        </div>
        <div className="flex flex-row justify-center w-full items-center">
          <Image alt="Kindi" src={PartnerBulb} className="w-[24px] h-[24px]" />
          <div className="text-black text-start clarabodyTwo">
            You can add {5 - partners.length} more profiles{" "}
          </div>
        </div>
      </div>
    </>
  );
}
