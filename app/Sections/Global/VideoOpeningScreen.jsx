"use client";

// components/VideoOpeningScreen.js
import { useEffect } from "react";

const VideoOpeningScreen = ({ onFinished }) => {
  useEffect(() => {
    // Call the onFinished prop when the video ends
    const video = document.getElementById("opening-video");

    const handleVideoEnd = () => {
      onFinished();
    };

    video.addEventListener("ended", handleVideoEnd);

    // Cleanup event listener on component unmount
    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
      <video id="opening-video" className="w-full h-full object-cover" autoPlay>
        <source src="opening.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoOpeningScreen;
