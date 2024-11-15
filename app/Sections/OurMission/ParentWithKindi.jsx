"use client";

import {
  BookOpen,
  HowItWorkVideo,
  ParentwithKindi,
  ProfessionalThumb,
  PWKOne,
  PWKTwo,
} from "@/public/Images";
import Image from "next/image";
import { useRef, useState } from "react";
import Claras3DGallery from "./ClaraGallery";

const InternalChip = ({
  image,
  title = "Delivered by highly experienced early years professionals",
}) => {
  return (
    <div className="claracontainer  liquid-hover cursor-pointer w-full pl-4  bg-white rounded-[26px] flex justify-start gap-[12px] flex-row items-center">
      <Image
        alt="Kindi"
        src={image || BookOpen}
        className="w-[24px] h-[24px]"
      />
      <div className="text-black text-[16px] w-full font-medium py-4 pr-4 rounded-r-[24px] hover:text-[white] duration-150 liquid-hover font-montserrat leading-[16px]">
        {title}{" "}
      </div>
    </div>
  );
};



export default function ParentWithKindi({ fetchedData }) {
  return (
    <>
      <section className="w-full h-auto bg-[#523373] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        {/* <section className="w-full h-auto cursor-pointer bg-gradient-to-r from-[#523373] to-[#663399] hover:from-[#663399] hover:to-[#523373] duration-500 items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]"> */}
        <div className="claracontainer  md:px-0 lg:px-4 px-4 py-12 w-full flex flex-col-reverse lg:flex-row xl:flex-row overflow-hidden gap-8">
          <div className="w-full py-6 flex-col justify-start items-start button inline-flex">
            {/* Top Heading Section */}
            <div className="flex-col flex justify-center heading items-start">
              <div className="text-start w-full">
                <span className="text-red claraheading">Be Confident: </span>
                <br className="flex md:hidden lg:flex" />
                <span className="text-white claraheading">
                  Parent With Kindi
                </span>
              </div>
              <div className="flex w-full container justify-start px-0 items-center flex-col">
                <div className="w-full px-0 text-start clarabodyTwo text-[white] font-medium font-fredoka">
                  {/* Parenthood is a whirlwind of responsibilities, and we get it.
                  That&apos;s why we&apos;ve created Kindi, a haven for busy
                  parents like you. No more endless scrolling for play ideas.
                  With Kindi, every moment counts.
                  <br />
                  <br />
                  Our platform offers curated activities for children aged 6
                  months to 5 years, designed to make learning enjoyable. Say
                  goodbye to parenting uncertainties and hello to confident
                  meaningful experiences at home that foster your child&apos;s
                  growth and witness your child flourish, knowing each
                  interaction shapes their future.
                  <br />
                  <br />
                  Explore exciting monthly themes covering literacy, numeracy,
                  fine motor skills, sensory play, and crafting. With Kindi,
                  embark on this journey of discovery and growth confidently,
                  giving your child the best start in life.
                  <br />
                  <br />
                  Parents trust Kindi because it comes from a place of love,
                  passion and real-life experience. Join the Kindi community and
                  together, let&apos;s create lasting memories and build a
                  brighter future for our children. */}
                  <p>{fetchedData[0].parentWithKindi}</p>
                </div>
              </div>
            </div>
            <div className="py-3 w-full flex-col justify-start items-center gap-1 inline-flex">
              <InternalChip
                image={PWKOne}
                title="Delivered by highly experienced early years professionals"
              />
              <InternalChip
                image={PWKTwo}
                title="Proven learning activities — tried and tested "
              />
              <InternalChip
                image={BookOpen}
                title="Targeted learning for early learners of all stages of development "
              />
            </div>
          </div>
          <Claras3DGallery />
        </div>
      </section>
    </>
  );
}
