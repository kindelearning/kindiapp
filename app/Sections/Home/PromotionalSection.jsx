import { Button } from "@/components/ui/button";
import { PromotionalImage } from "@/public/Images";
import Image from "next/image";

export default function PromotionalSection() {
  return (
    <>
      <section className="w-full h-auto bg-[#029871] items-center justify-center py-8 flex flex-col md:flex-row gap-[20px] transition-all duration-300 animate-fade-in">
        <div className="claracontainer py-4 px-4 lg:px-0 md:py-6 lg:py-12 w-full flex flex-col-reverse md:justify-center md:items-center lg:flex-row xl:flex-row overflow-hidden gap-8 animate-slide-up">
          <div className="w-full flex lg:min-w-[54%] lg:w-[50%] flex-col button justify-start items-start h-auto transition-all duration-300 animate-expand">
            <div className="w-full flex flex-col justify-start items-start h-auto gap-6 md:gap-6 script">
              <div className="text-white clarascript animate-fade-in">
                Play now, learn for life
              </div>
              <div className="flex flex-col w-full justify-start items-start heading /* gap-4 md:gap-6 lg:gap-7 xl:gap-8 */ animate-fade-in">
                <span className="text-white claraheading capitalize animate-fade-in">
                  Child Development Unlocked
                </span>
                <div className="w-auto h-auto text-white clarabodyTwo  animate-fade-in">
                  The foundation for a lifetime of success and happiness is laid
                  in the first five years of a child&apos;s life. During this
                  critical period, fundamental life skills are established as
                  the brain rapidly grows to 90% of its adult size, creating new
                  synaptic pathways that shape behaviour and habits permanently.
                  Consistent, quality adult interactions are key to channelling
                  nurtured learning into lifelong positive behaviours. For many
                  parents, supporting their children&apos;s development at home can
                  feel uncertain and filled with guesswork. However, that&apos;s
                  where Kindi comes in.
                </div>
              </div>
            </div>
            <div className="w-auto hover:pl-[4px] duration-200 h-auto animate-fade-in">
              <Button className="bg-[#ffffff] hover:bg-[white] text-[#029871] clarabutton">
                Get Started
              </Button>
            </div>
          </div>
          <div className="w-full px-4 md:px-8 xl:px-12 md:w-[50%] flex justify-center items-center h-auto animate-fade-in">
            <div className="w-[400px] h-auto">
              <Image
                alt="child development unlocked"
                src={PromotionalImage}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
