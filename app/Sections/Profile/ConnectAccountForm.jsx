"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserDataByEmail } from "@/lib/hygraph";
import { useEffect, useState } from "react";

const HYGRAPH_MAIN_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_MAIN_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

export default function ConnectAccountForm({ userId }) {
  const [partnerEmail, setPartnerEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user]);

  // Function to check if partner exists
  const checkPartnerExists = async (email) => {
    const query = `
      query GetAccountByEmail($email: String!) {
        account(where: { email: $email }) {
          id
          email
        }
      }
    `;
    const response = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query, variables: { email } }),
    });
    const result = await response.json();
    return result.data && result.data.account;
  };

  // Handles form submission
  const handleInvite = async (e) => {
    e.preventDefault();

    if (!user || !hygraphUser) {
      setMessage("You must be logged in to invite a partner.");
      return;
    }

    try {
      setIsLoading(true);

      // Check if the partner exists
      const partnerExists = await checkPartnerExists(partnerEmail.trim());
      if (!partnerExists) {
        setMessage("Partner does not exist. Please enter a valid email.");
        return;
      }

      // Define mutation query and variables
      const mutation = `
        mutation AddPartner($accountEmail: String!, $partnerEmail: String!) {
          updateAccount(
            where: { email: $accountEmail },
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
        accountEmail: hygraphUser.email, // Current logged-in user's email
        partnerEmail: partnerEmail.trim(),
      };

      const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HYGRAPH_TOKEN}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        setMessage(`Error: ${result.errors[0].message}`);
      } else {
        setMessage("Partner invited successfully!");
        setPartnerEmail(""); // Clear input field after success
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleInvite}
      className="flex w-full flex-col justify-start items-start gap-4"
    >
      <Input
        type="email"
        value={partnerEmail}
        onChange={(e) => setPartnerEmail(e.target.value)}
        placeholder="Enter partner's email"
        required
        className="bg-white w-full rounded-lg focus-within:border-0 focus-within:border-[#ffffff00] shadow border border-[#383838]"
      />
      <Button
        type="submit"
        className="clarabutton bg-red hover:bg-hoverRed"
        disabled={isLoading}
      >
        {isLoading ? "Inviting..." : "Invite Partner"}
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
}
