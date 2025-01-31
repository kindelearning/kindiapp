"use client";

import { fetchHowItWorks } from "@/app/data/p/HowItWorks";
import { ToggleCard } from "@/app/Widgets";
import {
  Crafts,
  ExploringSeasons,
  FineMotor,
  GrossMotor,
  ListeningTalking,
  MasteringFeelings,
  OutdoorsNature,
  PretendPlay,
  ProblemsolvingIndependence,
  RainyPlay,
  SensoryDevelopment,
  SocialPlay,
} from "@/public/Images";
import React, { useState } from "react";
import SkillToggleCardGrid from "./SkillToggleCardGrid";

/**
 * @Data It is the Data for Toggle card we used below
 */
const cardData = [
  {
    title: "Sensory Development ",
    icon: SensoryDevelopment,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Experience, regulate and express feelings</li>
        <li>Labelling emotions (emotional literacy)</li>
        <li>Understanding one’s self and others</li>
        <li>Making friends</li>
        <li>Building confidence and self-assurance</li>
      </ul>
    ),
    backgroundColor: "6B9E01",
  },
  {
    title: " Mastering Feelings",
    icon: MasteringFeelings,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Managing self-care independently </li>
        <li>Learning about healthy living</li>
      </ul>
    ),
    backgroundColor: "B4CD00",
  },
  {
    title: " Listening & Talking",
    icon: ListeningTalking,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Listening and paying attention</li>
        <li>Understanding spoken language </li>
        <li>Developing vocabulary</li>
        <li>Learning to speak </li>
        <li>BInteracting and communicating with others</li>
      </ul>
    ),
    backgroundColor: "FFB900",
  },
  {
    title: "Problem-solving & Independence",
    icon: ProblemsolvingIndependence,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Moving, handling and using gross motor skills</li>
        <li> Developing fine motor skills in preparation for (pre)writing</li>
      </ul>
    ),
    backgroundColor: "FF8E01",
  },
  {
    title: "Social Play",
    icon: SocialPlay,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Enjoying looking at books</li>
        <li>Reading books</li>
        <li>Comprehending language</li>
        <li>Enjoying rhymes, poems and songs Making marks</li>
        <li>Exploring letter sounds and phonics</li>
        <li>Learning to write</li>
      </ul>
    ),
    backgroundColor: "019772",
  },
  {
    title: "Fine Motor",
    icon: FineMotor,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Exploring nature and the world</li>
        <li>Talking about people and the local community</li>
        <li>UUnderstanding similarities and differences</li>
        <li>Learning to use technology</li>
        <li>Looking after the environment</li>
      </ul>
    ),
    backgroundColor: "019C9E",
  },
  {
    title: "GROSS MOTOR",
    icon: GrossMotor,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Enjoying being creative</li>
        <li>Expressing oneself through words, movement, art and books</li>
        <li>Making music, singing and dancing</li>
        <li>Playing imaginatively</li>
        <li>Using different medias and colours to express oneself</li>
      </ul>
    ),
    backgroundColor: "A033B2",
  },
  {
    title: "Pretend Play",
    icon: PretendPlay,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Learning about numbers & counting</li>
        <li>Comparing quantities </li>
        <li>Recognising the passing of time </li>
        <li>Exploring measures, weight, capacity and space </li>
        <li>Understanding shapes and opposites </li>
        <li>Discovering science and math concepts</li>
      </ul>
    ),
    backgroundColor: "C42798",
  },
  {
    icon: Crafts,
    title: "Crafts",
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Learning about numbers & counting</li>
        <li>Comparing quantities </li>
        <li>Recognising the passing of time </li>
        <li>Exploring measures, weight, capacity and space </li>
        <li>Understanding shapes and opposites </li>
        <li>Discovering science and math concepts</li>
      </ul>
    ),
    backgroundColor: "009ACC",
  },
  {
    title: "Exploring the Seasons",
    icon: ExploringSeasons,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Learning about numbers & counting</li>
        <li>Comparing quantities </li>
        <li>Recognising the passing of time </li>
        <li>Exploring measures, weight, capacity and space </li>
        <li>Understanding shapes and opposites </li>
        <li>Discovering science and math concepts</li>
      </ul>
    ),
    backgroundColor: "0076A6",
  },
  {
    title: "Outdoors & Nature",
    icon: OutdoorsNature,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Learning about numbers & counting</li>
        <li>Comparing quantities </li>
        <li>Recognising the passing of time </li>
        <li>Exploring measures, weight, capacity and space </li>
        <li>Understanding shapes and opposites </li>
        <li>Discovering science and math concepts</li>
      </ul>
    ),
    backgroundColor: "3E65CA",
  },
  {
    title: "Rainy Day Play",
    icon: RainyPlay,
    description: (
      <ul className="w-auto text-white clarabodyTwo list-disc ">
        <li>Learning about numbers & counting</li>
        <li>Comparing quantities </li>
        <li>Recognising the passing of time </li>
        <li>Exploring measures, weight, capacity and space </li>
        <li>Understanding shapes and opposites </li>
        <li>Discovering science and math concepts</li>
      </ul>
    ),
    backgroundColor: "BF69CB",
  },
];

export default async function KindiSkillsCategories({ fetchedData }) {
  const data = await fetchHowItWorks();
  if (!data) {
    return <div>Error loading page content</div>;
  }

  return (
    <section className="w-full h-auto bg-[#3F3A64] items-center justify-center pb-12 pt-4 flex flex-col md:flex-row gap-[20px]">
      <div className="claracontainer p-0 md:px-0 md:py-8 lg:py-8 lg:px-4 w-full flex flex-col overflow-hidden gap-4">
        <div className="claracontainer p-4 w-full py-6 flex-col justify-start items-center gap-6 inline-flex">
          <div className="text-start w-full md:text-center">
            <div>
              <span className="text-white claraheading">
                {data.KindiSkillsCategoriesTitle.split(" ")
                  .slice(0, 1)
                  .join(" ") || "Kindi's"}{" "}
              </span>
              <span className="text-red claraheading">
                {data.KindiSkillsCategoriesTitle.split(" ")
                  .slice(1, 6)
                  .join(" ") || "Skills Categories "}{" "}
              </span>
            </div>
          </div>
          <div className="flex w-full justify-start items-start flex-col">
            <div className="w-full px-0 md:px-12 lg:px-32 text-start md:text-center text-[#ffffff] font-fredoka text-[18px] font-medium leading-[22px]">
              {/* <p>
                {data.KindiSkillsCategoriesBody ||
                  "Encouraging children to tackle open-ended problems nurtures their creative thinking and equips them with skills for a successful life. Kindi supports this journey by providing tailored learning exercises designed to nurture these skills through play"}
              </p> */}
              {data.KindiSkillsCategoriesBody ? (
                <p
                  className="prose clarabodyTwo text-[#ffffff]"
                  dangerouslySetInnerHTML={{
                    __html: data.KindiSkillsCategoriesBody,
                  }}
                />
              ) : (
                <p className="prose text-[#ffffff] clarabodyTwo">
                  Encouraging children to tackle open-ended problems nurtures
                  their creative thinking and equips them with skills for a
                  successful life. Kindi supports this journey by providing
                  tailored learning exercises designed to nurture these skills
                  through play
                </p>
              )}
            </div>
          </div>
        </div>
        <SkillToggleCardGrid />
      </div>
    </section>
  );
}
