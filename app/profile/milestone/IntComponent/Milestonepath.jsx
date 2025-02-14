"use client";

import * as d3 from "d3";
import { useAuth } from "@/app/lib/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserDataByEmail } from "@/lib/hygraph";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DialogClose } from "@radix-ui/react-dialog";
import MarkMilestoneCompleteForm from "./MilestoneCompleteButton";
import { fetchUserDetails } from "../../api";
import { activityIcons } from "@/app/constant/menu";

export function CurvePath({
  milestones = [],
  currentUserId,
  custommilestoneidfromuser,
}) {
  const [currentDate, setCurrentDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  // console.log("realMilestoneData from CurevePath", custommilestoneidfromuser);

  // Dynamically set container height based on the number of nodes
  const nodeSpacing = 200; // Define the desired spacing between nodes
  const containerHeight = (milestones.length - 1) * nodeSpacing + 300; // Increased padding for better layout
  const baseAmplitude = 40; // Double the base amplitude for a larger curve
  const frequency = 0.2; // Frequency of the wave

  // State for container width
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Set the container width after the component mounts
    setContainerWidth(window.innerWidth);

    // Optionally handle resizing
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once after mount

  // Generate nodes and paths
  const nodes = [];
  const paths = [];

  // Loop through milestones data
  for (let i = 0; i < custommilestoneidfromuser.length; i++) {
    // if (i % 2 !== 0) continue; // Skip odd indices
    const milestone = custommilestoneidfromuser[i];

    const top = i * nodeSpacing;
    const left =
      i === 0 || i === milestones.length - 1
        ? containerWidth / 2 // Center for first and last nodes
        : i % 2 === 0
        ? containerWidth * 0.3 // Left for even
        : containerWidth * 0.7; // Right for odd

    const buttonTop = top + 60; // Adjust top spacing
    const buttonLeft = left - 110; // Adjust left spacing

    // Add node to nodes array
    nodes.push(
      <div
        key={milestone.id}
        style={{
          position: "absolute",
          top: `${buttonTop}px`,
          left: `${buttonLeft}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Dialog className="p-2 lg:p-4">
          <DialogTrigger>
            <button className="transition duration-300 ease-in-out hover:scale-[1.03] font-fredoka tracking-wider font-bold text-[10px] md:text-[16px] hover:bg-purple hover:border-2 hover:border-[#ffffff] border-transparent md:px-6 border-2 rounded-[12px] bg-red px-4 py-2 hover:shadow text-white">
              {(milestone.Title?.length > 28
                ? milestone.Title.substring(0, 28) + "..."
                : milestone.Title) || "Action"}
            </button>
          </DialogTrigger>
          <DialogContent className="w-full bg-[#eaeaf5] p-0 lg:min-w-[800px] ">
            <DialogHeader className="p-4">
              <DialogTitle>
                <div className="text-center">
                  <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    Update {milestone.Title}
                    {/* Update {milestone.documentId} */}
                  </span>{" "}
                  <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    for your Kid
                  </span>
                </div>
              </DialogTitle>
              <DialogDescription className="w-full p-4 flex flex-col gap-4 justify-start items-start">
                <div className="flex w-fit font-fredoka gap-2 justify-between items-center">
                  <Badge className="bg-[#eaeaf5] hover:bg-red text-red hover:text-white font-medium text-[12px] border-red">
                    {milestone.Category}
                  </Badge>
                  <Badge className="bg-[#eaeaf5] hover:bg-red text-red hover:text-white font-medium text-[12px] border-red">
                    {milestone.SubCategory}
                  </Badge>
                </div>
                <div className="text-[#0a1932] text-[32px] font-semibold leading-8 font-fredoka">
                  {milestone.Title}
                </div>
                <div
                  className="w-full prose text-[#4a4a4a] clarabodyTwo justify-center items-center"
                  dangerouslySetInnerHTML={{ __html: milestone.Description }}
                />
                {/* </div> */}
                <div className="w-full p-2 flex flex-col gap-2 bg-white rounded-lg shadow">
                  <div className="text-[#757575] clarabodyTwo ">
                    Date of Completion
                  </div>
                  <div className="text-[#0a1932] text-[20px] font-normal font-fredoka leading-[20px]">
                    {currentDate}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-between py-4 flex flex-row">
                <DialogClose className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-[20px] md:text-[24px] font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
                    <ChevronLeft className="w-[24px] h-[24px]" />
                    Back
                  </Button>
                </DialogClose>
                <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  <MarkMilestoneCompleteForm
                    passmilestoneId={milestone.id}
                    userId={currentUserId}
                  />
                </div>
              </section>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );

    // Add path to paths array, skip the first node
    if (i > 0) {
      const previousTop = (i - 1) * nodeSpacing;
      const previousLeft =
        i - 1 === 0 || i - 1 === milestones.length - 1
          ? containerWidth / 2
          : (i - 1) % 2 === 0
          ? containerWidth * 0.3
          : containerWidth * 0.7; // Alternate positions

      // Control points to make the curve bend at the nodes
      const controlPointX1 =
        previousLeft +
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20);
      const controlPointY1 =
        previousTop + (top - previousTop) / 2 + Math.sin(i * frequency) * 20;
      const controlPointX2 =
        left -
        Math.sin(i * frequency) * (baseAmplitude * 2 + Math.random() * 20);
      const controlPointY2 =
        previousTop + (top - previousTop) / 2 - Math.sin(i * frequency) * 20;

      // Create a cubic Bezier curve using the 'C' command
      const pathD = `M ${previousLeft} ${previousTop} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${left} ${top}`;

      paths.push(
        <path
          key={`path-${milestone.id}`}
          d={pathD}
          fill="none"
          stroke="#f05c5c"
          strokeWidth="4"
          strokeDasharray="5,5" // Dotted line
        />
      );
    }
  }

  return (
    <div
      className="relative w-full hidden md:flex h-full pb-24 bg-gray-100 overflow-hidden"
      style={{ minHeight: `${containerHeight}px` }}
    >
      {/* SVG for drawing paths */}
      <svg
        className="absolute bg-[#eaeaf5] top-0 left-0 w-full h-full"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        preserveAspectRatio="none"
      >
        {paths}
      </svg>
      {nodes}
    </div>
  );
}

export const TrigSnakeCurve = ({
  amplitude = 6,
  mileStoneCustomData = [],
  step = 0.1,
  currentUserId,
  custommilestoneidfromuser,
}) => {
  const [currentDate, setCurrentDate] = useState("");
  const numButtons = mileStoneCustomData.length;
  const maxY = numButtons * Math.PI * 2;

  // Current Date
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  if (!mileStoneCustomData || mileStoneCustomData.length === 0) {
    return <div>No data available</div>;
  }

  const sinePoints = [];
  for (let y = 0; y < maxY; y += step) {
    const xSine = amplitude * Math.sin(y);
    sinePoints.push({ x: xSine, y: -y });
  }

  const extremePositions = [];
  for (let i = Math.PI / 2; i < maxY; i += Math.PI) {
    if (extremePositions.length >= numButtons) break;
    const xExtreme = amplitude * Math.sin(i);
    extremePositions.push({ x: xExtreme, y: -i });
  }

  // Assume a scaling factor for SVG to DOM transformation
  const scaleX = 10; // Adjust these scaling factors as necessary for your use case
  const scaleY = 10;

  return (
    <div
      className="h-full flex md:hidden relative"
      style={{ width: "100%", position: "relative" }}
    >
      <svg
        viewBox={`-10 -${maxY / 2} 20 ${maxY}`}
        width="100%"
        className="min-h-[700px]"
        height="100%"
      >
        <path
          d={sinePoints
            .map(
              (point, index) =>
                `${index === 0 ? "M" : "L"} ${point.x},${point.y}`
            )
            .join(" ")}
          stroke="#f05c5c"
          strokeWidth="0.1"
          strokeDasharray="0.2,0.2"
          fill="none"
        />
        {extremePositions.map((pos, index) => (
          <g key={index}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r="0.4"
              className="cursor-pointer"
              fill="#f05c5c"
            />
          </g>
        ))}
      </svg>

      {/* Non-SVG Elements Positioned Based on Extreme Points */}
      {extremePositions.map((pos, index) => (
        <div
          key={`non-svg-${index}`}
          style={{
            position: "absolute",
            left: `calc(50% + ${pos.x * scaleX * 2}px)`, // Adjust position based on SVG-to-DOM conversion
            top: `calc(50% + ${pos.y * scaleY * 2}px)`,
            transform: "translate(-50%, -50%)", // Center the element at the calculated position
          }}
        >
          <Dialog className="p-2 lg:p-4">
            <DialogTrigger>
              <button className="text-[12px] min-w-[60px] max-w-[80px] w-full rounded-sm px-2 bg-red text-white">
                {(mileStoneCustomData[index]?.Title?.length > 20
                  ? mileStoneCustomData[index]?.Title.substring(0, 14) + "..."
                  : mileStoneCustomData[index]?.Title) || "Action"}
              </button>
            </DialogTrigger>
            <DialogContent className="w-full bg-[#eaeaf5] p-0 lg:min-w-[800px]">
              <DialogHeader className="p-4">
                <DialogTitle>
                  <div className="text-center">
                    <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                      Update {mileStoneCustomData[index]?.Title}
                    </span>{" "}
                    <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                      for your Kid
                    </span>
                  </div>
                </DialogTitle>
                <DialogDescription className="w-full p-4 flex overflow-x-scroll scrollbar-hidden flex-col gap-4 justify-start items-start">
                  <div className="flex w-full overflow-x-scroll scrollbar-hidden font-fredoka gap-2 justify-between items-center">
                    <Badge className="bg-[#eaeaf5] hover:bg-red text-red hover:text-white font-medium text-[12px] border-red">
                      {mileStoneCustomData[index]?.Category}
                      {/* {mileStoneCustomData[index]?.Category.split(" ")[0]} */}
                    </Badge>
                    <Badge className="bg-[#eaeaf5] hover:bg-red text-red hover:text-white font-medium text-[12px] border-red">
                      {/* {mileStoneCustomData[index]?.SubCategory.split(" ")[0]} */}
                      {mileStoneCustomData[index]?.SubCategory}
                    </Badge>
                  </div>
                  <div className="text-[#0a1932] w-full text-start font-fredoka text-[20px] font-[600]">
                    {mileStoneCustomData[index]?.Title}
                  </div>
                  <div
                    className="w-full text-start text-[#4a4a4a] clarabodyTwo justify-center items-center prose"
                    dangerouslySetInnerHTML={{
                      __html:
                        mileStoneCustomData[index]?.Description ||
                        "Description not found",
                    }}
                  />

                  <div className="w-full p-2 flex flex-col gap-2 bg-white rounded-lg shadow">
                    <div className="text-[#757575] clarabodyTwo">
                      Date of Completion
                    </div>
                    <div className="text-[#0a1932] text-[20px] font-normal font-fredoka leading-[20px]">
                      {currentDate}
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-t-[16px] items-center justify-between py-4 flex flex-row">
                  <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                    <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-[20px] md:text-[24px] font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
                      <ChevronLeft className="w-[24px] h-[24px]" />
                      Back
                    </Button>
                  </div>
                  <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                    <MarkMilestoneCompleteForm
                      passmilestoneId={custommilestoneidfromuser[index]?.id}
                      userId={currentUserId}
                    />
                  </div>
                </section>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

// SnakeWave Component

const ParametricWave = ({
  width = 300,
  step = 5,
  amplitude = 50,
  frequency = 2,
  strokeColor = "red",
  strokeWidth = 3,
  strokeDasharray = "6,6",
  items = [],
  currentUserId,
  custommilestoneidfromuser,
}) => {
  const [dialogContent, setDialogContent] = useState(null); // State to store dialog content
  const [currentDate, setCurrentDate] = useState("");
  const dynamicHeight = Math.max(200, items.length * 100 + 50);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const { pathD, turningPoints } = generateWavePath(
    width,
    dynamicHeight,
    step,
    amplitude,
    frequency
  );

  const handleDialogOpen = (item) => {
    setDialogContent(item); // Set dialog content to the clicked item
  };

  const handleDialogClose = () => {
    setDialogContent(null); // Close dialog
  };

  return (
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${dynamicHeight}px`,
      }}
    >
      <svg
        width={width}
        height={dynamicHeight}
        viewBox={`0 0 ${width} ${dynamicHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute" }}
      >
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />
      </svg>

      {/* Render Item Titles at each turning point Custom Dialog trigger */}
      {turningPoints.map((point, index) => (
        <div
          key={index}
          // className="text-[16px]  min-w-[100px] max-w-[160px] w-full font-fredoka rounded-full px-2 pl-4 bg-red text-white"
          className="transition duration-300 ease-in-out hover:scale-[1.03] font-fredoka tracking-wider font-bold text-[10px] md:text-[16px] hover:bg-purple hover:border-2 hover:border-[#ffffff] border-transparent md:px-6 border-2 rounded-[12px] bg-red px-4 py-2 hover:shadow text-white"
          style={{
            position: "absolute",
            left: `${point.x - 15}px`,
            top: `${point.y - 15}px`,
            zIndex: 10,
            cursor: "pointer", // Add cursor style to indicate clickable
          }}
          onClick={() => handleDialogOpen(items[index])} // Open dialog on click
        >
          <text
            x={point.x + 20}
            y={point.y}
            fill="black"
            fontSize="12"
            fontFamily="Arial"
            textAnchor="start"
            dominantBaseline="middle"
          >
            {items[index] ? items[index].Title : "More Comming Soon..."}
          </text>
        </div>
      ))}

      {/* Dialog Box using Radix UI Dialog */}
      {dialogContent && (
        <Dialog open={!!dialogContent} onOpenChange={handleDialogClose}>
          <DialogContent className="w-full bg-[#eaeaf5] p-2 lg:p-4 lg:min-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                <div className="text-center">
                  <span className="text-[#3f3a64] text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                    Update{" "}
                  </span>{" "}
                  <span className="text-red text-[24px] md:text-[36px] font-semibold font-fredoka capitalize">
                  {" "}   {dialogContent?.Title || "No Title"}
                  </span>
                </div>
              </DialogTitle>
              <DialogDescription className="w-full p-4 flex flex-col gap-4 justify-start items-start">
                <div className="flex w-full overflow-x-scroll scrollbar-hidden font-fredoka gap-2 justify-start items-center">
                  <Badge className="bg-[#eaeaf5] cursor-pointer rounded-full hover:bg-red text-red hover:text-white font-medium text-[12px] border-red">
                    {dialogContent?.Category}
                  </Badge>
                  <Badge className="bg-[#eaeaf5] cursor-pointer rounded-full hover:bg-red text-red hover:text-white font-medium text-[12px] border-red">
                    {/* {mileStoneCustomData[index]?.SubCategory.split(" ")[0]} */}
                    {dialogContent?.SubCategory}
                  </Badge>
                </div>
                <div className="text-[#0a1932] w-full text-start font-fredoka text-[20px] font-[600]">
                  {dialogContent?.Title}
                </div>
                <div
                  className="w-full text-start text-[#4a4a4a] clarabodyTwo justify-center items-center prose"
                  dangerouslySetInnerHTML={{
                    __html:
                      dialogContent?.Description || "Description not found",
                  }}
                />
                <div className="w-full p-2 flex flex-col gap-2 bg-white rounded-lg shadow">
                  <div className="text-[#757575] clarabodyTwo">
                    Date of Completion
                  </div>
                  <div className="text-[#0a1932] text-[20px] font-normal font-fredoka leading-[20px]">
                    {currentDate}
                  </div>
                </div>
                {/* <p>
                  <strong>Document ID:</strong>{" "}
                  {dialogContent?.documentId || "N/A"}
                </p> */}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <section className="w-full h-auto shadow-upper bg-[#ffffff] -top-2 sticky bottom-0 z-10 rounded-[16px] items-center justify-between py-4 flex flex-row">
                <DialogClose className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  <Button className="px-4 py-2 bg-white hover:bg-white text-[#3f3a64] text-[20px] md:text-[24px] font-medium font-fredoka leading-none rounded-2xl border-2 border-[#3f3a64] justify-center items-center gap-1 inline-flex">
                    <ChevronLeft className="w-[24px] h-[24px]" />
                    Back
                  </Button>
                </DialogClose>
                <div className="w-fit flex flex-row justify-between items-center gap-4 px-4">
                  <MarkMilestoneCompleteForm
                    passmilestoneId={custommilestoneidfromuser?.id}
                    userId={currentUserId}
                  />
                </div>
              </section>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

function generateWavePath(width, height, step, amplitude, frequency) {
  let d = `M ${width / 2},0 `;
  const turningPoints = [];
  let previousSlope = 0;

  for (let y = 0; y <= height; y += step) {
    const x =
      width / 2 + amplitude * Math.sin((frequency * (y * Math.PI)) / 180);
    d += `L ${x},${y} `;

    const slope = amplitude * Math.cos((frequency * (y * Math.PI)) / 180);

    if ((previousSlope > 0 && slope < 0) || (previousSlope < 0 && slope > 0)) {
      turningPoints.push({ x, y });
    }

    previousSlope = slope;
  }

  return { pathD: d, turningPoints };
}

// function DisplayAllMileStoneOld({ passThecurrentUserId }) {
//   const [milestones, setMilestones] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [realMilestoneData, setRealMilestoneData] = useState([]);
//   const router = useRouter();
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("All");

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("jwt");
//       if (!token) {
//         return;
//       }

//       try {
//         const data = await fetchUserDetails(token);
//         setUserData(data);
//         const evenIndexedMilestones = data.allMilestones.filter(
//           (_, index) => index % 2 === 0
//         );
//         console.log("even Indexed Milestones", evenIndexedMilestones);
//         // setRealMilestoneData(data.allMilestones);
//         setRealMilestoneData(evenIndexedMilestones);

//         // Milestone Data fetchcing
//         const response = await fetch(
//           "https://lionfish-app-98urn.ondigitalocean.app/api/milestones?populate=*"
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const milestoneData = await response.json(); // Parse the JSON from the response
//         if (!Array.isArray(milestoneData.data)) {
//           throw new Error("Fetched data is not an array.");
//         }

//         setMilestones(milestoneData.data);
//       } catch (error) {
//         console.error("Error fetching user data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [router]);

//   console.log("Fetched milestones:", milestones);
//   // console.log("Fetched euserData on Milestone pag:", userData);
//   // console.log("Fetched setRealMilestoneId ", realMilestoneData);

//   if (!Array.isArray(milestones)) {
//     return <p>Error: Expected milestones to be an array.</p>;
//   }

//   // Extract unique categories and subcategories
//   const categories = [
//     // "All",
//     ...new Set(milestones.map((m) => m.Category).filter(Boolean)),
//   ];

//   const subCategories = [
//     "All",
//     ...new Set(
//       milestones
//         .filter(
//           (m) => selectedCategory === "All" || m.Category === selectedCategory
//         )
//         .map((m) => m.SubCategory)
//         .filter(Boolean)
//     ),
//   ];

//   // Filter milestones based on selected filters
//   const filteredMilestones = milestones.filter(
//     (m) =>
//       (selectedCategory === "All" || m.Category === selectedCategory) &&
//       (selectedSubCategory === "All" || m.SubCategory === selectedSubCategory)
//   );

//   console.log(
//     "Filtered Milestone based on category and subcategory",
//     filteredMilestones
//   );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <div className=" mx-auto flex flex-col gap-4">
//         <div className="flex gap-2 w-full  items-center justify-center max-w-full overflow-x-scroll scrollbar-hidden">
//           {categories && <CategorySlider categories={categories} />}
//         </div>

//         {/* SubCategory Filter */}
//         <div className="flex gap-2 w-full max-w-full items-center justify-center overflow-x-scroll scrollbar-hidden">
//           {subCategories.map((subCat) => (
//             <Badge
//               key={subCat}
//               onClick={() => setSelectedSubCategory(subCat)}
//               className={`px-4 py-1 hover:bg-red hover:text-white rounded-full text-sm ${
//                 selectedSubCategory === subCat
//                   ? "bg-red text-white"
//                   : "bg-gray-200  text-gray-700"
//               }`}
//             >
//               {subCat}
//             </Badge>
//           ))}
//         </div>
//       </div>

//       <section className="w-full pb-24 h-full bg-[#EAEAF5] items-center justify-center py-4 flex flex-col gap-[20px]"></section>
//       <TrigSnakeCurve
//         amplitude={6}
//         custommilestoneidfromuser={realMilestoneData}
//         mileStoneCustomData={filteredMilestones}
//         currentUserId={passThecurrentUserId}
//       />
//       <CurvePath
//         custommilestoneidfromuser={realMilestoneData}
//         milestones={filteredMilestones}
//         currentUserId={passThecurrentUserId}
//       />
//     </>
//   );
// }

const data = [
  [14.3439, 20.2948],
  [14.0271, 18.6241],
  [12.2172, 17.1499],
  [8.914, 17.1007],
  [5.7014, 17.7887],
  [3.1222, 16.855],
  [2.5339, 14.5455],
  [3.2127, 12.7273],
  [4.8869, 11.6462],
  [7.1946, 11.5479],
  [9.8643, 11.8428],
  [12.0814, 11.7936],
  [14.0271, 10.2703],
  [13.8914, 7.9115],
  [11.991, 6.2408],
  [9.6833, 6.1916],
  [6.8326, 6.6339],
  [4.6154, 6.4373],
  [3.4389, 4.3735],
  [4.7964, 2.2113],
  [7.6018, 1.8182],
  [10.0, 2.113],
  [11.81, 2.1622],
  [13.5294, 1.1794],
];

const width = 400;
const height = 400;
const scaleX = d3
  .scaleLinear()
  .domain([0, 15])
  .range([50, width - 50]);
const scaleY = d3
  .scaleLinear()
  .domain([0, 22])
  .range([height - 50, 50]);

const path = d3
  .line()
  .x((d) => scaleX(d[0]))
  .y((d) => scaleY(d[1]))
  .curve(d3.curveBasis)(data);

const SCurve = () => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={path} fill="none" stroke="black" strokeWidth={2} />
    </svg>
  );
};

export function CategorySlider({ categories }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next category
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to move to the previous category
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  // Find the matched icon from the activityIcons array based on the category name
  const matchedIcon = activityIcons.find(
    (icon) => icon.title === categories[currentIndex]
  );

  return (
    <div className="flex items-center rounded-[20px] w-fit bg-white justify-between gap-0">
      {/* Slider Container */}
      <div className="flex justify-center items-center gap-2 w-fit">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="w-[32px] h-[32px] flex justify-center items-center left-0 top-1/2 transform bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
        >
          <ChevronLeft />
        </button>

        {/* Current Category Display */}
        <div className="flex w-fit justify-center">
          <div className="px-2 py-2 w-full max-w-[260px] rounded-full gap-2 bg-white transition duration-200 flex items-center">
            {matchedIcon && (
              <Image
                src={matchedIcon.icon}
                alt={categories[currentIndex]}
                className="w-[24px] h-[24px]"
              />
            )}

            <span className="font-fredoka min-w-[max-content] font-semibold">
              {categories[currentIndex]}
            </span>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="w-[32px] h-[32px] flex justify-center items-center right-0 top-1/2 transform bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default function DisplayAllMileStone({ passThecurrentUserId }) {
  const [milestones, setMilestones] = useState([]); // Stores all milestones
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // Selected subcategory
  const [filteredData, setFilteredData] = useState([]); // Stores filtered milestones
  const [realMilestoneData, setRealMilestoneData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [amplitude, setAmplitude] = useState(100); // State to control amplitude

  // Fetch milestones from the API
  useEffect(() => {
    const fetchMilestones = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        return;
      }
      try {
        const myData = await fetchUserDetails(token);
        setUserData(myData);
        const evenIndexedMilestones = myData.allMilestones.filter(
          (_, index) => index % 2 === 0
        );
        // console.log("even Indexed Milestones", evenIndexedMilestones);
        // setRealMilestoneData(data.allMilestones);
        setRealMilestoneData(evenIndexedMilestones);

        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/milestones?populate=*"
        );
        const data = await response.json();
        setMilestones(data.data); // Set fetched milestones
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching milestones:", error);
        setLoading(false); // Stop loading even on error
      }
    };

    fetchMilestones();
  }, []);

  // Group milestones by Category and SubCategory
  const groupMilestones = () => {
    const groupedData = {};

    milestones.forEach((milestone) => {
      const { Category, SubCategory } = milestone;

      if (!groupedData[Category]) {
        groupedData[Category] = {};
      }

      if (!groupedData[Category][SubCategory]) {
        groupedData[Category][SubCategory] = [];
      }

      groupedData[Category][SubCategory].push(milestone);
    });

    return groupedData;
  };

  // Set default selected category and subcategory
  useEffect(() => {
    if (milestones.length > 0) {
      const groupedMilestones = groupMilestones();
      const firstCategory = Object.keys(groupedMilestones)[0];
      const firstSubCategory =
        firstCategory && Object.keys(groupedMilestones[firstCategory])[0];

      setSelectedCategory(firstCategory || null);
      setSelectedSubCategory(firstSubCategory || null);
    }
  }, [milestones]);

  // Update filtered data when category or subcategory changes
  // Update filtered data and handle category or subcategory selection
  useEffect(() => {
    const groupedMilestones = groupMilestones();

    if (selectedCategory) {
      const subCategories = Object.keys(
        groupedMilestones[selectedCategory] || {}
      );
      if (subCategories.length > 0) {
        // Preselect the first subcategory only when switching categories
        if (
          !selectedSubCategory ||
          !subCategories.includes(selectedSubCategory)
        ) {
          setSelectedSubCategory(subCategories[0]); // Automatically select the first subcategory
        }
      } else {
        setSelectedSubCategory(null); // Reset subcategory if none exist
      }

      // Filter milestones based on selected category and subcategory
      setFilteredData(
        selectedSubCategory
          ? groupedMilestones[selectedCategory][selectedSubCategory] || []
          : Object.values(groupedMilestones[selectedCategory] || {}).flat()
      );
    } else {
      setFilteredData([]); // Clear filtered data if no category is selected
      setSelectedSubCategory(null); // Reset subcategory
    }
  }, [selectedCategory, selectedSubCategory, milestones]);

  // Handle loading state
  if (loading) {
    return <div className="text-center text-lg font-medium">Loading...</div>;
  }
  const groupedMilestones = groupMilestones();
  const categories = Object.keys(groupedMilestones);
  const subCategories = selectedCategory
    ? Object.keys(groupedMilestones[selectedCategory] || {})
    : [];

  console.log("Filtered  Milestones", filteredData);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {/* Categories */}
      {categories && (
        <CategoryCarousel
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {/* Subcategories */}
      {selectedCategory && (
        <div className="flex gap-2 w-full max-w-full items-center justify-center overflow-x-scroll scrollbar-hidden">
          {subCategories.map((subCategory) => (
            <Badge
              key={subCategory}
              className={`px-4 py-1 hover:bg-red hover:text-white rounded-full text-sm
                ${
                  selectedSubCategory === subCategory
                    ? "bg-red text-white"
                    : "bg-gray-200  text-gray-700"
                }
              hover:bg-hoverRed cursor-pointer transition`}
              onClick={() =>
                setSelectedSubCategory(
                  selectedSubCategory === subCategory ? null : subCategory
                )
              }
            >
              {subCategory}
            </Badge>
          ))}
        </div>
      )}

      {/* Slider to control amplitude */}
      {/* <input
        type="range"
        min="10"
        max="500"
        value={amplitude}
        onChange={(e) => setAmplitude(Number(e.target.value))}
      />
      <label>Amplitude: {amplitude}</label> */}
      <ParametricWave
        width={1200}
        amplitude={amplitude}
        items={filteredData}
        currentUserId={passThecurrentUserId}
        custommilestoneidfromuser={realMilestoneData}
        frequency={2}
        strokeColor="red"
        strokeWidth={2}
        strokeDasharray="6,3"
      />
      {/* <SCurve /> */}
      {/* <div className="flex flex-col lg:py-12 w-full">
        {Array.isArray(filteredData) ? (
          <CurvePath
            custommilestoneidfromuser={realMilestoneData}
            milestones={filteredData}
            currentUserId={passThecurrentUserId}
          />
        ) : null}
        {Array.isArray(filteredData) ? (
          <TrigSnakeCurve
            amplitude={6}
            custommilestoneidfromuser={realMilestoneData}
            mileStoneCustomData={filteredData}
            currentUserId={passThecurrentUserId}
          />
        ) : null}
      </div> */}
    </div>
  );
}

function CategoryCarousel({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update selectedCategory whenever currentIndex changes
  useEffect(() => {
    setSelectedCategory(categories[currentIndex]);
  }, [currentIndex, categories, setSelectedCategory]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < categories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const matchedIcon = activityIcons.find(
    (icon) => icon.title === categories[currentIndex]
  );

  return (
    <div className="flex py-1 px-1 items-center rounded-[20px] w-fit bg-white justify-between gap-0">
      <div className="flex justify-center items-center gap-2 w-fit">
        {/* Left Arrow */}
        <button
          className={`w-[32px] h-[32px] ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }  flex justify-center items-center left-0 top-1/2 transform bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Visible Category */}
        <div className="flex w-fit justify-center">
          <div className="px-2 py-2 w-full max-w-[360px] rounded-full gap-2 bg-white transition duration-200 flex items-center">
            {matchedIcon && (
              <Image
                src={matchedIcon.icon}
                alt={categories[currentIndex]}
                className="w-[24px] h-[24px]"
              />
            )}
            <div
              className={`px-2 font-fredoka min-w-[max-content] rounded-full text-lg font-medium 
          ${
            selectedCategory === categories[currentIndex]
              ? "bg-red-600 text-red"
              : "bg-transparent text-gray-700"
          }`}
            >
              {categories[currentIndex]}
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className={`w-[32px] h-[32px] ${
            currentIndex === categories.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          } flex justify-center items-center right-0 top-1/2 transform bg-white bg-opacity-30 backdrop-blur-lg text-[#000000] p-2 rounded-full z-10 rounded-full`}
          onClick={handleNext}
          disabled={currentIndex === categories.length - 1}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
