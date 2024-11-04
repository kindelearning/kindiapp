"use client";

import { useEffect, useState } from "react";
import { DebitCard } from "..";

const HYGRAPH_MAIN_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_MAIN_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

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
export default function PaymentMethodsList({ userId }) {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(HYGRAPH_MAIN_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
          },
          body: JSON.stringify({
            query: GET_PAYMENT_METHODS_QUERY,
            variables: { userId },
          }),
        });

        const { data, errors } = await response.json();

        if (errors) {
          setError("Error fetching payment methods: " + errors[0].message);
        } else {
          console.log("Fetched payment methods:", data.account.myPaymentMethod); // Debugging line
          setPaymentMethods(data.account.myPaymentMethod || []);
        }
      } catch (error) {
        setError("Error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [userId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {paymentMethods.length > 0 ? (
        <>
          {paymentMethods.map((method) => (
            <div
              className="w-full items-center justify-center flex"
              key={method.id}
            >
              <DebitCard
                cardName={method.name}
                cardNumber={method.number}
                expiary={method.expiryDate}
              />
            </div>
          ))}
        </>
      ) : (
        <p>No payment methods saved.</p>
      )}
    </>
  );
}
