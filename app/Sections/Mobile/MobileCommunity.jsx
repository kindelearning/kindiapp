"use client";

import { getPublishedPosts } from "@/lib/hygraph";
import { BlogThumb } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LocalBlogCard = ({
  image,
  title = "Blog Title",
  metsDesc = "Blog metsDesc",
}) => {
  return (
    <>
      <div className="bg-white min-w-[300px] shadow-md cursor-pointer rounded-2xl overflow-hidden">
        <div className="flex overflow-clip">
          <Image
            width={400}
            height={300}
            src={image || BlogThumb}
            alt={title}
            className="w-full hover:scale-110 duration-500 rounded-t-2xl ease-out h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-[24px] font-bold text-[#3F3A64] font-fredoka">
            {title.slice(0, 20)}...
          </h2>
          <p className="text-[#757575] clarabodyTwo ">
            {metsDesc.length > 100 ? metsDesc.slice(0, 100) + "..." : metsDesc}
          </p>
        </div>
      </div>
    </>
  );
};
export default function MobileCommunity({}) {
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getPublishedPosts();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] items-center justify-center py-4 pb-12 flex transition-all animate-fade-in  duration-300 flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex-col justify-start gap-4 items-center script inline-flex">
          <div className="flex justify-between px-4  items-center w-full">
            <h1 className="clarabodyTwo text-[#0A1932] w-full justify-start items-center text-start">
              Playful Learning Essentials
            </h1>
            <Link
              href="/p/community"
              className="clarabodyTwo text-red min-w-[max-content] justify-start items-center text-start"
            >
              View All
            </Link>
          </div>

          <div className="lg:grid claracontainer w-full flex pl-4 flex-row overflow-x-scroll scrollbar-hidden hover:px-2 gap-4 lg:grid-cols-2 xl:grid-cols-2">
            {blogs.map((blog) => (
              <div key={blog.id}>
                <Link
                  target="_blank"
                  href={`/p/community/${blog.id}`}
                  onClick={() => console.log("Clicked Blog:", blog.blogTitle)}
                >
                  <article className="bg-white rounded-lg">
                    <LocalBlogCard
                      title={blog.blogTitle}
                      metsDesc={blog.metaDescription}
                      image={blog.thumbnail.url || BlogThumb}
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
