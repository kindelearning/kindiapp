import { ThemeDummy } from "@/public/Images";
import Image from "next/image";
import ThemeTimer from "../Chip/ThemeTimer";

const ThemeCard = ({ image, title, metaDesc, theTime }) => {
  return (
    <div
      className={`flex flex-col gap-[-12px] justify-center items-end animate-fade-in transition-all duration-300  cursor-pointer group`}
    >
      <div
        className={`p-[8px] w-full bg-[#3f3d91] min-w-[360px] flex flex-col items-end rounded-[16px] animate-slide-up `}
      >
        <div
          className={`w-full min-h-[140px] flex max-h-[142px] bg- [#3f3d91] md:min-h-[160px] md:max-h-[162px]  justify-between border-2 border-white  rounded-[12px] `}
        >
          <div
            className={`w-full max-w-[260px] md:max-w-[220px] flex flex-col bg-[#3f3d91] lg:max-w-[460px] z-2 rounded-r-[60px] rounded-l-[50px] lg:rounded-l-[38px] py-4 lg:py-8 justify-start items-start pl-4 pr-2 animate-fade-in`}
          >
            <div className="text-white flex lg:hidden font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[24px] md:leading-[28px] lg:text-[32px] lg:leading-[36px] xl:text-[36px] xl:leading-[40px]">
              {title.length > 14
                ? title.slice(0, 12) + "..."
                : title || "Winter Magic"}
            </div>
            <div className="text-white hidden lg:flex font-semibold font-fredoka capitalize text-[24px] leading-[28px] md:text-[24px] md:leading-[28px] lg:text-[32px] lg:leading-[36px] xl:text-[36px] xl:leading-[40px]">
              {title.length > 24
                ? title.slice(0, 24) + "..."
                : title || "Winter Magic"}
            </div>
            <div className="text-[white] flex lg:hidden clarabodyTwo text-[14px] font-montserrat">
              {metaDesc.length > 100
                ? metaDesc.slice(0, 100) + "..."
                : metaDesc ||
                  "Snowy adventures, ice castles, cozy indoor playtimes."}
            </div>
            <div className="text-[white] hidden lg:flex text-[14px] leading-[20px] md:text-[18px] md:leading-[22px] font-fredoka font-medium">
              {metaDesc.length > 160
                ? metaDesc.slice(0, 180) + "..."
                : metaDesc ||
                  "Snowy adventures, ice castles, cozy indoor playtimes."}
            </div>
          </div>
          <div className="flex overflow-clip -z-20 -ml-[96px] group-hover:scale-[1.025] transition-all duration-300">
            <Image
              alt="Kindi"
              width={400}
              height={100}
              src={image || ThemeDummy}
              className={`w-full max-w-[130px] md:max-w-[200px] lg:max-w-[240px]  h-full object-cover rounded-r-[12px] animate-fade-in`}
            />
          </div>
        </div>
      </div>
      <div className="-mt-4 flex mr-2 z-12 animate-fade-in">
        <ThemeTimer targetDate={theTime} />
      </div>
    </div>
  );
};

export default ThemeCard;
