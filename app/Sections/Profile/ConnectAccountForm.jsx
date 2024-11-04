"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HYGRAPH_MAIN_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_MAIN_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

export default function ConnectAccountForm({ userId }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //   const { data: session, status } = useSession();
  //   const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     if (session && session.user) {
  //       fetchUserData(session.user.email);
  //     }
  //   }, [session]);

  //   const fetchUserData = async (email) => {
  //     try {
  //       const data = await client.request(GET_ACCOUNT_BY_EMAIL, { email });
  //       setProfileData(data.account);
  //     } catch (error) {
  //       console.error("Error fetching profile data:", error);
  //     }
  //   };

  const handleConnect = async (e) => {
    e.preventDefault();

    if (!session || !session.user) {
      setMessage("Please log in to connect a partner.");
      return;
    }

    const query = `
          mutation AddPartner($userId: ID!, $partnerEmail: String!) {
            updateAccount(
              where: { id: $userId },
              data: {
                partner: {
                  connect: { where: { email: $partnerEmail } }
                }
              }
            ) {
              id
              email
              username
              partner {
                id
                email
                username
              }
            }
          }
        `;

    const variables = {
      userId, // Use the userId prop directly for the logged-in user's ID
      partnerEmail: email.trim(),
    };

    try {
      setIsLoading(true);
      const response = await fetch(HYGRAPH_MAIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        setMessage("Error connecting partner: " + result.errors[0].message);
      } else {
        setMessage("Partner connected successfully!");
        setEmail("");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
      console.error("Error during partner connection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleConnect}
      className="flex w-full flex-col justify-start items-start gap-4"
    >
      <Input
        type="email"
        className="bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00] shadow border border-[#383838]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter partner's email"
        required
      />
      <Button
        className="clarabutton bg-red hover:bg-hoverRed"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Connect Partner"}
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
}
