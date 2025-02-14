"use client";

import { ChevronRight } from "lucide-react";
import React, { useState } from "react";



// const Accordian = ({ title, description }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="w-full bg-[white] px-4 rounded-[12px] claracontainer">
//       <div
//         className="flex bg-[white] py-1 justify-between w-full items-center cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <h2 className="text-[#3f3a64] text-[16px] py-2 md:py-[10px] font-[550] font-fredoka">
//           {title}
//         </h2>
//         <span
//           className={`text-lg text-red ${
//             isOpen ? "rotate-90" : ""
//           } transition-transform duration-300`}
//         >
//           <ChevronRight />
//         </span>
//       </div>
//       {isOpen && (
//         <div className="pb-4">
//           <p className="text-base font-medium text-[#0A1932]">{description}</p>
//         </div>
//       )}
//     </div>
//   );
// };


const Accordian = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[white] px-4 rounded-[12px] claracontainer">
      <div
        className="flex bg-[white] py-1 justify-between w-full items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-[#3f3a64] text-[16px] py-2 md:py-[10px] font-[550] font-fredoka">
          {title}
        </h2>
        <span
          className={`text-lg text-red ${
            isOpen ? "rotate-90" : ""
          } transition-transform duration-300`}
        >
          <ChevronRight />
        </span>
      </div>
      {isOpen && (
        <div className="pb-4">
          <div className="w-full prose text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
            <span
              dangerouslySetInnerHTML={{
                __html: description || "No content available",
              }}
            />
            {/* {description} */}
          </div>
          {/* <p className="text-base font-medium text-[#0A1932]">{description}</p> */}
        </div>
      )}
    </div>
  );
};


export default Accordian;
