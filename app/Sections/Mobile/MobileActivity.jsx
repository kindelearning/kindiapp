import {
  DiscoveringOurWorldActivity,
  ExperimentsMathActivity,
  ReadingWritingActivity,
  SpeechLanguageActivity,
} from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

export default function MobileActivity({ activities }) {
  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] items-center justify-center py-4 flex transition-all animate-fade-in  duration-300 flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex-col justify-start gap-4 items-center script inline-flex">
          <div className="flex justify-between px-4  items-center w-full">
            <h1 className="clarabodyTwo text-[#0A1932] w-full justify-start items-center text-start">
              Popular Speach & Language Activites
            </h1>
            <Link
              href="/p/activities"
              className="clarabodyTwo text-red min-w-[max-content] justify-start items-center text-start"
            >
              View All
            </Link>
          </div>

          <div className="lg:grid claracontainer w-full flex pl-4 flex-row overflow-x-scroll scrollbar-hidden hover:px-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
            {activities.map((activity) => (
              <div key={activity.id}>
                <article className="rounded-lg ">
                  <Link target="_blank" href={`/p/activities/${activity.id}`}>
                    <div className="md:w-full hover:shadow-md duration-200 min-w-[200px] w-[200px] min-h-[250px] h-full bg-white items-start justify-start border rounded-3xl flex flex-col md:flex-row gap-4">
                      <div className="claracontainer w-full flex-col justify-start items-center gap-7 inline-flex">
                        <div className="w-full max-w-[240px]  lg:max-w-full h-auto  ">
                          <div className="flex max-h-[180px] min-h-[150px] h-[150px] lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px]  overflow-clip rounded-t-2xl ">
                            <Image
                              width={280}
                              height={250}
                              alt={activity.title}
                              className="w-full max-h-[180px] duration-300 hover:scale-105 lg:min-h-[276px] lg:h-full lg:max-h-[276px] md:max-h-[300px] object-cover rounded-t-[16px] "
                              src={activity.thumbnail.url}
                            />
                          </div>
                          <div className="w-full p-2 flex-col justify-start lg:p-4 items-start flex gap-2 md:gap-2 lg:gap-4">
                            <div className="flex-col w-full gap-[6px] justify-start items-start">
                              <div className="text-[#0a1932] text-[12px]  md:text-[16px] font-semibold font-fredoka leading-[20px]">
                                {activity.title.length > 20
                                  ? `${activity.title.slice(0, 18)}...`
                                  : activity.title}
                              </div>
                              <div className="justify-start w-full items-center gap-1 lg:gap-2 inline-flex">
                                <div className="text-[#0a1932] min-w-[max-content] justify-between items-center gap-6 flex px-0 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                  {activity.setUpTime}
                                </div>
                                <ul className="text-[#0a1932] justify-between items-center gap-6 flex px-4 lg:text-[16px] text-[10px] font-normal font-fredoka list-disc leading-none">
                                  {activity.skills
                                    .slice(0, 2)
                                    .map((skill, index) => (
                                      <li key={index}>{skill.slice(0, 8)}</li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                            <div className="items-center justify-center gap-2 md:gap-4 grid grid-cols-5">
                              <Image
                                alt="Kindi"
                                className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                src={SpeechLanguageActivity}
                              />
                              <Image
                                alt="Kindi"
                                className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                src={DiscoveringOurWorldActivity}
                              />
                              <Image
                                alt="Kindi"
                                className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                src={ReadingWritingActivity}
                              />
                              <Image
                                alt="Kindi"
                                className="w-[20px] h-[24px] lg:w-[48px] lg:h-[48px]"
                                src={ExperimentsMathActivity}
                              />
                              <div
                                className={`w-[20px] lg:w-[48px] lg:h-[48px] h-[20px] flex lg:rounded-[12px] justify-center items-center bg-[#F6BEBF] rounded-[4px]`}
                              >
                                <span className="text-red p-[2px] text-[12px] lg:text-[20px] font-medium font-fredoka">
                                  +1
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
