import React from "react";

export default function MobileHero() {
  return (
    <>
      <section className="w-full md:min-h-[600px] md:h-full px-4 lg:h-auto bg-[#F5F5F5] py-12 md:py-24 lg:py-28 items-start justify-center flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex flex-col-reverse justify-between md:items-center lg:flex-row px-0 md:px-2 lg:px-0 xl:flex-row gap-8 md:gap-0 lg:gap-4 ">
          <h1 className="clarabodyTwo text-[#0A1932] w-full justify-start items-center text-start">
            Today&apos;s Activity
          </h1>

        </div>
      </section>
    </>
  );
}
