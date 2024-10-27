import { BlogCard } from "@/app/Widgets";
import { BlogThumb, BlogThumbThree, BlogThumbTwo } from "@/public/Images";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const blogData = [
  {
    id: 1,
    title: "The Importance of Black Play",
    description:
      "Discover the Crucial Role of Block Play in Nurturing Cognitive, Social, and Physical Development in Children",
  },
  {
    id: 2,
    image: BlogThumbThree,
    title: "The Power of Outdoor Play",
    description:
      "Unlock the benefits of outdoor play: fostering health, social skills, and a lifelong connection with nature.",
  },
  {
    id: 3,
    image: BlogThumbTwo,
    title: "Socializing: Dos and Don’ts",
    description:
      "Navigating Socializing Etiquette: Guidelines for Positive Interaction and Conflict Avoidance Strategies",
  },
  {
    id: 4,
    image: BlogThumbThree,
    title: "Socializing: Dos and Don’ts",
    description:
      "Navigating Socializing Etiquette: Guidelines for Positive Interaction and Conflict Avoidance Strategies",
  },
  // Add more blog data here...
];

export default function BlogDetailPage({ likes = "9876", comments = "456" }) {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center pb-24 flex flex-col gap-[20px]">
        <Image
          src={BlogThumb}
          alt="Article Image"
          className="w-full h-60 md:h-[400px] lg:h-[400px] object-cover"
        />
        <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-8">
          <div className="w-full mx-auto flex flex-col gap-4 justify-center items-center">
            <div className="flex max-w-4xl w-full mx-auto justify-start items-start">
              <div className="flex gap-4 items-center">
                <div className="flex items-center">
                  <button className="text-[#F05C5C] bg-[#FBCECE] rounded-full p-2 hover:text-[#da4848]">
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.182 5.14726C14.8694 4.787 14.483 4.49811 14.0491 4.30016C13.6151 4.10221 13.1437 3.99982 12.6667 3.99993H10.0073L10.2313 2.63926C10.3106 2.1601 10.215 1.66842 9.96191 1.25389C9.70885 0.839355 9.31521 0.529601 8.8528 0.381121C8.39038 0.23264 7.89 0.255327 7.44292 0.445043C6.99584 0.634759 6.63184 0.978863 6.41733 1.41459L5.14133 3.99993H3.33333C2.4496 4.00098 1.60237 4.35251 0.97748 4.97741C0.352588 5.6023 0.00105857 6.44953 0 7.33326L0 10.6666C0.00105857 11.5503 0.352588 12.3976 0.97748 13.0224C1.60237 13.6473 2.4496 13.9989 3.33333 13.9999H12.2C13.0023 13.9966 13.7768 13.7055 14.3825 13.1794C14.9883 12.6533 15.3851 11.9272 15.5007 11.1333L15.9707 7.79993C16.0369 7.32708 16.0007 6.84554 15.8646 6.38788C15.7286 5.93022 15.4958 5.50714 15.182 5.14726ZM1.33333 10.6666V7.33326C1.33333 6.80283 1.54405 6.29412 1.91912 5.91905C2.29419 5.54397 2.8029 5.33326 3.33333 5.33326H4.66667V12.6666H3.33333C2.8029 12.6666 2.29419 12.4559 1.91912 12.0808C1.54405 11.7057 1.33333 11.197 1.33333 10.6666ZM14.6473 7.61259L14.1767 10.9459C14.1079 11.4219 13.8705 11.8574 13.5077 12.1732C13.145 12.4889 12.6809 12.664 12.2 12.6666H6V5.15593C6.06283 5.10119 6.11484 5.03516 6.15333 4.96126L7.61267 2.00459C7.66739 1.90588 7.74476 1.82156 7.83842 1.75857C7.93207 1.69557 8.03934 1.6557 8.1514 1.64223C8.26346 1.62876 8.37712 1.64207 8.48304 1.68108C8.58896 1.72008 8.6841 1.78366 8.76067 1.86659C8.82617 1.94276 8.87405 2.03244 8.9009 2.12924C8.92775 2.22604 8.93291 2.32757 8.916 2.42659L8.564 4.55993C8.54855 4.65525 8.55399 4.75279 8.57995 4.8458C8.60591 4.93881 8.65176 5.02507 8.71433 5.09861C8.77691 5.17216 8.85472 5.23123 8.94237 5.27174C9.03003 5.31226 9.12544 5.33325 9.222 5.33326H12.6667C12.9529 5.33322 13.2359 5.39464 13.4964 5.51336C13.7569 5.63208 13.9888 5.80533 14.1766 6.02142C14.3644 6.2375 14.5036 6.49137 14.5848 6.76588C14.666 7.04039 14.6873 7.32913 14.6473 7.61259Z"
                        fill="#F05C5C"
                      />
                    </svg>
                  </button>
                  <span className="ml-1 font-semibold">{likes}</span>
                </div>
                <div className="flex items-center">
                  <button className="text-[#0a1932] bg-[#f8f8f8] rounded-full p-2 hover:text-[#0a1932]">
                    <svg
                      className="w-4 h-4 "
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-0.000753244 8.16472C0.0956635 6.60473 0.646478 5.10706 1.58378 3.85633C2.52109 2.60561 3.80391 1.65651 5.2741 1.12605C6.74429 0.595582 8.33758 0.50694 9.85754 0.871048C11.3775 1.23516 12.7577 2.0361 13.8279 3.17513C14.8982 4.31416 15.6118 5.74149 15.8806 7.28116C16.1495 8.82082 15.9619 10.4055 15.341 11.8399C14.7202 13.2742 13.6931 14.4955 12.3865 15.3532C11.0799 16.2109 9.55088 16.6675 7.98791 16.6667H3.33258C2.4488 16.6658 1.60146 16.3144 0.976532 15.6894C0.351601 15.0645 0.000129217 14.2172 -0.000753244 13.3334V8.16472ZM1.33258 13.3334C1.33258 13.8638 1.54329 14.3725 1.91837 14.7476C2.29344 15.1227 2.80215 15.3334 3.33258 15.3334H7.98791C8.92863 15.333 9.85869 15.1343 10.7174 14.7503C11.5762 14.3662 12.3444 13.8055 12.9719 13.1047C13.6025 12.4042 14.076 11.577 14.3607 10.6786C14.6453 9.78012 14.7346 8.83118 14.6226 7.89538C14.4456 6.41935 13.7825 5.04418 12.7376 3.98667C11.6928 2.92916 10.3257 2.24946 8.85191 2.05472C8.56442 2.01868 8.27499 2.00043 7.98525 2.00005C6.4316 1.99581 4.92604 2.53865 3.73258 3.53338C3.03556 4.11268 2.46344 4.82749 2.05089 5.63447C1.63835 6.44146 1.39397 7.32381 1.33258 8.22805V13.3334Z"
                        fill="#0A1932"
                      />
                      <path
                        d="M10.6659 6.66667H7.99919C7.82238 6.66667 7.65281 6.59643 7.52778 6.4714C7.40276 6.34638 7.33252 6.17681 7.33252 6C7.33252 5.82319 7.40276 5.65362 7.52778 5.5286C7.65281 5.40357 7.82238 5.33333 7.99919 5.33333H10.6659C10.8427 5.33333 11.0122 5.40357 11.1373 5.5286C11.2623 5.65362 11.3325 5.82319 11.3325 6C11.3325 6.17681 11.2623 6.34638 11.1373 6.4714C11.0122 6.59643 10.8427 6.66667 10.6659 6.66667Z"
                        fill="#0A1932"
                      />
                      <path
                        d="M5.33252 8H10.6659C10.8427 8 11.0122 8.07024 11.1373 8.19526C11.2623 8.32029 11.3325 8.48986 11.3325 8.66667C11.3325 8.84348 11.2623 9.01305 11.1373 9.13807C11.0122 9.2631 10.8427 9.33333 10.6659 9.33333H5.33252C5.15571 9.33333 4.98614 9.2631 4.86111 9.13807C4.73609 9.01305 4.66585 8.84348 4.66585 8.66667C4.66585 8.48986 4.73609 8.32029 4.86111 8.19526C4.98614 8.07024 5.15571 8 5.33252 8Z"
                        fill="#0A1932"
                      />
                      <path
                        d="M5.33252 10.6667H10.6659C10.8427 10.6667 11.0122 10.7369 11.1373 10.8619C11.2623 10.987 11.3325 11.1565 11.3325 11.3333C11.3325 11.5101 11.2623 11.6797 11.1373 11.8047C11.0122 11.9298 10.8427 12 10.6659 12H5.33252C5.15571 12 4.98614 11.9298 4.86111 11.8047C4.73609 11.6797 4.66585 11.5101 4.66585 11.3333C4.66585 11.1565 4.73609 10.987 4.86111 10.8619C4.98614 10.7369 5.15571 10.6667 5.33252 10.6667Z"
                        fill="#0A1932"
                      />
                    </svg>
                  </button>
                  <span className="ml-1 font-semibold ">{comments}</span>
                </div>
              </div>
            </div>
            <div className="flex max-w-4xl w-full flex-col gap-4">
              <hr className="border-1 my-3 rounded-full w-full h-[2px] border-[#000000]" />
              <div className="w-full text-[#3f3a64] text-[44px] font-semibold font-fredoka leading-[48px]">
                The Importance of Black Play
              </div>{" "}
              <div className="w-full text-[#0a1932] text-2xl font-normal font-fredoka leading-[28px]">
                Discover the Crucial Role of Block Play in Nurturing Cognitive,
                Social, and Physical Development in Children
              </div>
              <div className="content py-4 flex flex-col gap-2 justify-center">
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <Image
                  src={BlogThumb}
                  alt="Article Image"
                  className="w-full h-60 md:h-[400px] lg:h-[400px] object-cover"
                />
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
                <div className="w-full text-justify text-[#0a1932] text-[19px] font-medium font-fredoka">
                  Geometrical montessori puzzle of colors, a toy made with wood
                  and sustainable and ecological colors. Beribus dite eum
                  fugitio blandaest, intemporecto cumende rfercillorum estemol
                  liatia num etur alitia voluptatur soluptas excerit aute
                  velecabore quiae nos moloraes doluptatur mi, estiore dundit
                  modigent.
                </div>{" "}
              </div>
            </div>
          </div>

          <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
            <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-4">
              <div className="w-full text-center">
                <span className="text-[#3f3a64] text-[32px] tracking-tight font-semibold font-fredoka uppercase leading-10">
                  Related{" "}
                </span>
                <span className="text-[#f05c5c] text-[32px] font-semibold font-fredoka uppercase leading-10">
                  Article
                </span>
              </div>
            </div>
            <div className="claracontainer w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 overflow-hidden gap-4">
              {blogData.map((blog, index) => (
                <BlogCard key={index} {...blog} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
