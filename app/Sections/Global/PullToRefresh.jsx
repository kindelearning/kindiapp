"use client";

import { useEffect, useState } from "react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

// export default function PullToRefresh({ onRefresh }) {
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [startY, setStartY] = useState(0);

//   const handleTouchStart = (e) => {
//     setStartY(e.touches[0].clientY);
//   };

//   const handleTouchMove = (e) => {
//     const currentY = e.touches[0].clientY;
//     const difference = currentY - startY;

//     if (difference > 50 && !isRefreshing) {
//       setIsRefreshing(true);
//       Haptics.impact({ style: ImpactStyle.Light });
//       onRefresh();
//     }
//   };

//   const handleTouchEnd = () => {
//     setIsRefreshing(false);
//   };

//   useEffect(() => {
//     window.addEventListener("touchstart", handleTouchStart);
//     window.addEventListener("touchmove", handleTouchMove);
//     window.addEventListener("touchend", handleTouchEnd);

//     return () => {
//       window.removeEventListener("touchstart", handleTouchStart);
//       window.removeEventListener("touchmove", handleTouchMove);
//       window.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [startY, isRefreshing]);

//   return null;
// }
export default function PullToRefresh({ onRefresh }) {
  useEffect(() => {
    const handleRefresh = (e) => {
      if (window.scrollY <= 0 && e.deltaY < 0) {
        onRefresh();
      }
    };

    window.addEventListener("wheel", handleRefresh);

    return () => {
      window.removeEventListener("wheel", handleRefresh);
    };
  }, [onRefresh]);

  return null; // This is a functional component to enable pull-to-refresh
}
