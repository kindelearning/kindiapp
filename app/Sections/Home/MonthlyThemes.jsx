import { ThemeCard } from "@/app/Widgets";

export default function MonthlyThemes({ homeData }) {
  return (
    <>
      <section className="w-full h-auto bg-[#F3BD40] items-center justify-center py-12 flex transition-all animate-fade-in  duration-300 flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex-col justify-start items-center script inline-flex">
          <div className="w-full claracontainer animate-fade-in px-4 duration-150 text-start  md:text-center text-[#eaeaf5] clarascript">
            Enjoy every Precious Moment with your Children
          </div>
          <div className="w-auto  flex-col justify-center items-center px-4 heading inline-flex">
            <div className="w-full text-start md:text-center">
              <span className="text-[#3f3a64] claraheading animate-fade-in  duration-150">
                This Month&apos;s{" "}
              </span>
              <br />
              <span className="text-[#ffffff] claraheading animate-fade-in  duration-150">
                Early Learning Themes
              </span>
            </div>
            <div className="w-full md:w-[500px] xl:w-[800px] animate-fade-in  duration-150 text-start md:text-center text-purple clarabodyTwo">
              {/* Providing themes for each activity is a powerful way to keep
              children engaged in learning; we use it to both maintain
              involvement and reinforce the previous day&apos;s learnings.
              That&apos;s why we release new themes every month. */}
              <p>{homeData[0].monthlyTheme}</p>
            </div>
          </div>

          <div className="lg:grid claracontainer w-full flex flex-row overflow-x-scroll scrollbar-hidden px-2 py-4 hover:px-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
            <ThemeCard />
            <ThemeCard />
            <ThemeCard />
            <ThemeCard />
          </div>
        </div>
      </section>
    </>
  );
}
