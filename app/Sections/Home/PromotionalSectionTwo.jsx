import { Button } from "@/components/ui/button";

export default function PromotionalSectionTwo({ homeData }) {
  return (
    <>
      <section className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-4 flex flex-col md:flex-row gap-4 transition-all duration-300 animate-fade-in">
        <div className="claracontainer p-4 py-8 md:px-2 md:py-12 lg:py-20 w-full flex flex-col md:justify-center md:items-center lg:flex-row xl:flex-row overflow-hidden gap-9 animate-slide-up">
          <div className="w-full md:w-[100%] lg:w-[540px] flex justify-start items-start h-auto animate-fade-in">
            <div className="w-full md:w-full flex items-start justify-start flex-col lg:w-[540px] h-auto">
              <video
                controls
                autoPlay
                loop
                muted
                className="object-cover max-h-[260px] lg:h-[360px] lg:max-h-[400px] rounded-[24px] w-full md:w-full lg:w-[540px] h-full"
              >
                <source src="preloader.mp4" type="video/mp4" /> Your browser
                does not support the video tag.
              </video>
            </div>
          </div>
          <div className="w-full flex-col justify-center items-start gap-6 flex md:gap-8 xl:gap-10 animate-fade-in">
            <div className="w-full h-auto gap-6 flex flex-col justify-start items-start">
              <div className="text-red clarascript animate-fade-in">
                Early Years Education for every Child
              </div>
              <div className="flex w-full justify-start items-start gap-4 flex-col">
                <div className="w-full claraheading animate-fade-in">
                  <span className="text-red claraheading ">Early Learning</span>

                  <span className="text-purple claraheading"> Experts</span>
                </div>
                <div className="w-full h-auto text-[#696969] clarabodyTwo animate-fade-in">
                  {/* “Scientists have recently determined that it takes
                  approximately 400 repetitions to create a new synapse in the
                  brain- unless it is done with play, in which case, it takes
                  between 10-20 repetitions.” */}
                  <p>{homeData[0].earlyLearningExperts}</p>

                  {/* - Dr. Karyn Purvis Institute of
                  Child Development.Play matters! It&apos;s the vital
                  developmental process that shapes the adults we&apos;re
                  destined to become. And we are in a rush, as essential life
                  skills become more challenging to master as children age.... */}
                </div>
              </div>
            </div>
            <div className="w-full h-auto animate-fade-in">
              <Button className="bg-red hover:bg-hoverRed px-4 md:px-8 xl:px-12 border-2 clarabutton rounded-[16px]">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
