"use client";

import { getStandardPagesContent } from "@/lib/hygraph";
import { useEffect, useState } from "react";

export default function VideoOpeningScreen({ onFinished }) {
  const [preloaderVideoUrl, setPreloaderVideoUrl] = useState(null); // State to hold video URL

  useEffect(() => {
    const video = document.getElementById("opening-video");

    const handleVideoEnd = () => {
      onFinished();
    };
    video.addEventListener("ended", handleVideoEnd);
    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [onFinished]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStandardPagesContent(); // Call your function
      if (data && data.openingVideo) {
        setPreloaderVideoUrl(data.openingVideo.url); // Set video URL from response
      }
    };

    fetchData(); // Invoke fetchData on mount
  }, []);

  if (!preloaderVideoUrl) {
    return (
      <div className="fixed flex-col inset-0 bg-black flex justify-center items-center z-50">
        {/* <video
          id="opening-video"
          className="w-full h-full object-cover"
          autoPlay
        >
          <source src="opening.mp4" type="video/mp4" />
          Your device does not support the video.
        </video> */}
      </div>
    ); // Fallback if video URL is not yet loaded
  }
  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
      <video id="opening-video" className="w-full h-full object-cover" autoPlay>
        <source src={preloaderVideoUrl || "opening.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
