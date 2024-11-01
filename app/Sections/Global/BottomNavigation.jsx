"use client";

import { navItems } from "@/app/constant/menu";
import Link from "next/link";
import React, { useState } from "react";

export default function BottomNavigation() {
  const [active, setActive] = useState("home");

  return (
    <nav className="fixed max-w-[100vw] bottom-0 left-0 right-0 bg-[white] shadow-md z-50 shadow-upper w-full rounded-t-[28px] justify-center items-center flex  lg:hidden xl:hidden  text-white transition-all duration-300 ease-in-out">
      <nav className="flex w-full py-4 gap-2 px-4 items-center md:justify-center md:px-48 justify-between">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setActive(item.id)}
            className={`flex  w-12 h-12 justify-center flex-col items-center flex-1 py-2  rounded-full transition-all duration-300 ease-in-out ${
              active === item.id
                ? "text-[#ffffff] bg-red scale-110"
                : "text-[#757575] scale-100"
            }`}
          >
            {active === item.id ? item.iconActive : item.iconInactive}
          </Link>
        ))}
      </nav>
    </nav>
  );
}
