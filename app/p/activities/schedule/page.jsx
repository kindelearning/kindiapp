import { NewCalendar } from "@/app/Widgets";
import TestingCalendar from "@/app/Widgets/Schedular/TestingCalendar";

export default function Schedule() {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] pb-24 items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4  w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-2">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                THE KINDI{" "}
              </span>
              <span className="text-red claraheading uppercase">
                ACTI VITY SCHEDULE
              </span>
            </div>
            <div className="w-full text-center text-[#3f3a64] clarabodyTwo">
              Here&apos;s where you&apos;ll discover your daily educational play
              activities. Utilize our drag-and-drop feature to rearrange
              learning, ensuring development seamlessly fits your schedule.
              Additionally, sync your schedule with your child&apos;s nursery
              for a smooth and integrated learning experience.
            </div>
          </div>
          <div className="claracontainer md:p-0 p-0 py-4 w-full flex lg:hidden flex-col overflow-hidden gap-8">
            <NewCalendar />
            {/* <TestingCalendar /> */}
          </div>
        </div>
      </section>
    </>
  );
}
