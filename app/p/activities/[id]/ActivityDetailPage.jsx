"use client";

import NewHeader from "@/app/Sections/Mobile/NewHeader";
import ProductMedia from "@/app/shop/section/ProductMedia";
import { ActivityImage, Themes } from "@/public/Images";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export async function fetchActivityByDocumentId(documentId) {
  const res = await fetch(
    `https://lionfish-app-98urn.ondigitalocean.app/api/activities/${documentId}?populate=*`
  );
  const data = await res.json();
  if (!data || !data.data) {
    return null; // If data is not found
  }

  return data.data;
}

export const ActivityAttribute = ({
  title = " Event Timeline",
  features = " 18th September 2023",
  image,
}) => {
  return (
    <div className="w-full cursor-pointer justify-between items-center inline-flex">
      <div className="justify-start w-full items-center gap-2 flex">
        <Image
          alt="Kindi"
          src={image || Themes}
          className="text-[#0a1932] w-4 h-4"
        />
        <div className=" text-[#0a1932] w-full text-[16px] font-normal font-fredoka leading-none">
          {title}
        </div>
      </div>
      <div className="text-[#0a1932] text-[16px] w-full justify-start items-center font-semibold font-fredoka leading-none">
        {features}
      </div>
    </div>
  );
};

export default function ActivityDetailPage({ params }) {
  const { id } = params;
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Avoid fetching if `id` is undefined or null
    if (!id) {
      setError("Invalid or missing activity ID.");
      setLoading(false);
      return;
    }

    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await fetchActivityByDocumentId(id); // Ensure this function is defined
        setActivity(response);
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError("Failed to load activity data.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  console.log("Activity Data", activity);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!activity) {
    return <div>Failed to load data or activity not found.</div>; // Fallback message if data is not found
  }

  const { Title, Gallery } = activity;
  return (
    <div>
      <NewHeader headerText="Activity" />
      <div className="w-full hidden text-[#3f3a64] claraheading capitalize">
        {Title}
      </div>
      <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
        {Gallery && Gallery.length > 0 ? (
          <ProductMedia gallery={Gallery} />
        ) : (
          <div className="w-full overflow-clip rounded-lg h-[300px] max-h-[300px] lg:h-[400px] lg:max-h-[400px] mb-4">
            <Image
              className="w-full h-full rounded-lg max-h-[300px] lg:h-[400px] lg:max-h-[400px] object-cover"
              alt="Placeholder Image"
              src={ActivityImage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
