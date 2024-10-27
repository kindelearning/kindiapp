import { Button } from "@/components/ui/button";
import { Curve, CurveTwo, HIWOne, HIWThree, HIWTwo } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <>
      <section className="w-full h-auto bg-[#4e2f71] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px] duration-300 animate-fade-in">
        <div className="claracontainer w-full px-4 md:px-2 lg:px-4 pb-6 pt-20 flex-col justify-start items-center gap-7 inline-flex">
          <div className="w-auto claracontainer flex-col justify-start items-start md:items-center gap-6 inline-flex">
            <div className="w-full text-start md:text-center">
              <span className="text-white claraheading animate-fade-in">
                How It{" "}
              </span>
              <span className="text-red text-start md:text-center claraheading animate-fade-in">
                Works
              </span>
            </div>
            <div className="w-full md:w-[500px] xl:w-[800px] text-start md:text-center animate-fade-in text-white clarabodyTwo">
              Regardless of parenting approaches or the development stage of
              children, Kindi delivers a wholesome, engaging and beautiful early
              childhood learning experience.
            </div>
          </div>

          <div className="flex w-full justify-center items-center flex-col gap-12">
            {/* Section One */}
            <div className="flex flex-col-reverse lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4">
              <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                <div className="text-white text-6xl md:text-[50px] p-0 animate-fade-in font-semibold font-fredoka uppercase leading-10">
                  01
                </div>
                <div className="flex-col flex justify-start items-start gap-6">
                  <div className="flex-col w-full justify-start items-start gap-5 flex">
                    <div className="w-full gap-3">
                      <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                        Select Your Preferred <br />
                      </span>
                      <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                        Educational Activities
                      </span>
                    </div>
                    <div className="w-full text-white animate-fade-in clarabodyTwo">
                      Kindi adds a suggested learning activity to your
                      personalised calendar every day, but you can swap or move
                      them around to suit your schedule. Develop your
                      child&apos;s personal, social, emotional and intellectual
                      traits by choosing from a range of specialised daily
                      activities. Empowering children to fulfil their potential
                      is now as fun as it is convenient.
                    </div>
                  </div>
                  <Link
                    href="/p/how-it-works#video"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 "
                  >
                    <Button className="absolute text-center animate-fade-in hover:bg-white bg-white text-red shadow border-2 border-white clarabutton">
                      SHOW ME
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full h-[460px] animate-fade-in md:max-w-[500px] flex items-end justify-end">
                <Image
                  alt="Kindi"
                  width={100}
                  height={100}
                  src={HIWOne}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <Image
              alt="Kindi"
              src={Curve}
              className="hidden md:hidden lg:flex w-[50%] -mb-[60px] -mt-[140px]"
            />

            {/* Section Two */}
            <div className="flex flex-col  lg:flex-row xl:flex-row w-full items-center justify-between py-8 gap-4">
              <div className="w-full h-[460px] md:max-w-[500px] flex items-end justify-end">
                <Image
                  alt="Kindi"
                  src={HIWTwo}
                  width={100}
                  height={100}
                  className="w-full h-full animate-fade-in object-contain"
                />
              </div>
              <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                <div className="text-white text-6xl md:text-[50px] p-0 font-semibold font-fredoka uppercase leading-10">
                  02
                </div>
                <div className="flex-col flex justify-start items-start gap-6">
                  <div className="flex-col w-full justify-start items-start gap-5 flex">
                    <div className="w-full gap-3">
                      <span className="text-white animate-fade-in claraheading lg:text-[44px]">
                        Guide Your Child{" "}
                      </span>
                      <span className="text-red animate-fade-in w-[max-content] claraheading lg:text-[44px]">
                        Through the Learning Process{" "}
                      </span>
                    </div>
                    <div className="w-full text-white animate-fade-in clarabodyTwo">
                      With Kindi, all our activities deliver mixed-age outcomes
                      without the need for multiple sessions. As you and your
                      child play, you&apos;ll receive tips and instructions
                      about extended learning. Just like a recipe, each early
                      years activity in this educational teaching and parenting
                      app includes an ingredients list — featuring everyday
                      household items. Simply follow the instructions and enjoy
                      the fun!
                    </div>
                  </div>
                  <Link
                    href="/p/how-it-works#video"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 relative"
                  >
                    <Button className="absolute text-center animate-fade-in bg-white hover:bg-white text-red shadow border-2 border-white clarabutton">
                      SHOW ME
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <Image
              alt="Kindi"
              src={CurveTwo}
              className="transform hidden md:hidden lg:flex -rotate-180 w-[56%]  -mt-[100px] -mb-[80px]"
            />

            {/* Section Three */}
            <div className="flex flex-col-reverse lg:flex-row xl:flex-row w-full items-center justify-between py-0 md:py-8 gap-6">
              <div className="min-h-[300px] animate-fade-in  flex flex-col md:flex-row w-full justify-start items-start gap-4">
                <div className="text-white text-6xl md:text-[50px] lg:text-[50px] p-0  font-semibold font-fredoka uppercase leading-10">
                  03
                </div>
                <div className="flex-col flex justify-start items-start gap-6">
                  <div className="flex-col w-full justify-start items-start gap-5 flex">
                    <div className="w-full gap-3">
                      <span className="text-white claraheading animate-fade-in lg:text-[44px]">
                        Enjoy{" "}
                      </span>
                      <span className="text-red w-[max-content] animate-fade-in claraheading lg:text-[44px]">
                        Precious Time{" "}
                      </span>
                    </div>
                    <div className="w-full text-white clarabodyTwo animate-fade-in">
                      Our guided learning activities are both fun and
                      educational. So whether you&apos;re working one-on-one
                      with your child or taking an entire nursery group through
                      Kindi&apos;s learning activities, playtime fun is always
                      part of the process. Our early years development guide
                      strikes the perfect balance between play and education, so
                      fun is never too far away!
                    </div>
                  </div>
                  <Link
                    href="/p/how-it-works#video"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 relative"
                  >
                    <Button className="absolute text-center animate-fade-in bg-white hover:bg-white text-red shadow border-2 border-white clarabutton">
                      SHOW ME
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full h-full md:max-w-[500px] animate-fade-in flex items-end justify-end lg:justify-start lg:items-start">
                <Image
                  alt="Kindi"
                  width={100}
                  height={100}
                  src={HIWThree}
                  className="w-full -mt-[50px] h-[400px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
