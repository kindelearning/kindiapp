"use client";

import { getStandardPagesContent } from "@/lib/hygraph";
import { useEffect, useState } from "react";

export default  function Preloader() {
  const [preloaderVideoUrl, setPreloaderVideoUrl] = useState(null); // State to hold video URL

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStandardPagesContent(); // Call your function
      if (data && data.preloaderVideo) {
        setPreloaderVideoUrl(data.preloaderVideo.url); // Set video URL from response
      }
    };

    fetchData(); // Invoke fetchData on mount
  }, []); // Empty dependency array to only run on mount

  if (!preloaderVideoUrl) {
    return (
      <div className="w-full h-screen flex justify-center items-center clarabodyTwo">
        {/* <video autoPlay loop muted className="flex justify-center items-center">
          <source src="preloader.mp4" type="video/mp4" />
        </video> */}
        Loading...
      </div>
    ); // Fallback if video URL is not yet loaded
  }

  return (
    <>
      <div className="flex w-screen justify-center items-center h-screen bg-[#eaeaf5]">
        <video autoPlay loop muted className="flex justify-center items-center">
          <source src={preloaderVideoUrl || "preloader.mp4"} type="video/mp4" />
        </video>
      </div>
    </>
  );
}
