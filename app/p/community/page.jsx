import { blogData } from "@/app/constant/blog";
import { BlogCard } from "@/app/Widgets";
import Link from "next/link";

export default function Community() {
  return (
    <>
      <section className="w-full h-auto pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer w-full flex flex-col overflow-hidden gap-2 md:gap-4">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] text-[32px] tracking-tight font-semibold font-fredoka uppercase leading-10">
                The Kindi{" "}
              </span>
              <span className="text-[#f05c5c] text-[32px] font-semibold font-fredoka uppercase leading-10">
                Connect
              </span>
            </div>
            <div className="w-full text-center px-0 md:px-12 lg:px-24 xl:px-28 text-[#3f3a64] clarabodyTwo">
              Here&apos;s where you&apos;ll discover your daily educational play
              activities. Utilize our drag-and-drop feature to rearrange
              learning, ensuring development seamlessly fits your schedule.
              Additionally, sync your schedule with your child&apos;s nursery
              for a smooth and integrated learning experience.
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full px-0 md:px-2 lg:px-0">
          </div>

          <div className="claracontainer w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 overflow-hidden gap-4">
            {/* Render filtered blogs */}
            {blogData.map((blog) => (
              <div key={blog.id}>
                <Link href="/p/community/slug">
                  <article className="bg-white rounded-lg">
                    <BlogCard
                      title={blog.title}
                      metsDesc={blog.metsDesc}
                      image={blog.image}
                    />
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
