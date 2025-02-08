"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.push("/"); // Redirect to home page
    }, 5000); // Adjust based on video length

    return () => clearTimeout(timer);
  }, [router]);

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={() => setShowSplash(false)}
      >
        <source src="/opening.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
