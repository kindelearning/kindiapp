"use client";

import { BlogCard } from "@/app/Widgets";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export default function MobileCommunity() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Blogs with Error Handling and AbortController
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const res = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/blogs?populate=comments&populate=FeaturedImage",
        { signal }
      );

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data = await res.json();

      if (data?.data) {
        setBlogs(data.data);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to load blogs. Please try again.");
        console.error("Error fetching blogs:", err);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort(); // Cleanup function
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <section className="w-full h-auto bg-[#F5F5F5] py-4 pb-12 flex flex-col items-center gap-5 transition-all animate-fade-in duration-300">
      <div className="claracontainer w-full flex flex-col gap-4 items-center">
        {/* Header */}
        <div className="flex justify-between px-4 items-center w-full">
          <h1 className="clarabodyTwo text-[#0A1932]">
            Playful Learning Essentials
          </h1>
          <Link
            href="/p/community"
            className="clarabodyTwo text-red min-w-[max-content]"
          >
            View All
          </Link>
        </div>

        {/* Content Section */}
        <div className="w-full">
          {loading ? (
            <div className="text-center text-gray-500">Loading blogs...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-gray-500">No blogs available.</div>
          ) : (
            <div className="lg:grid claracontainer w-full flex pl-4 flex-row overflow-x-scroll scrollbar-hidden px-2 gap-4">
              {blogs.map((item) => (
                <article
                  key={item.id}
                  className="min-w-[340px] w-[360px] rounded-lg"
                >
                  <BlogCard
                    documentId={item.documentId}
                    addUrl={`/p/community/${item.documentId}`}
                    metsDesc={
                      item?.MetaDescription ||
                      "Discover daily educational play activities."
                    }
                    title={item?.Text || "Untitled Post"}
                    image={
                      item?.FeaturedImage?.url
                        ? `https://lionfish-app-98urn.ondigitalocean.app${item?.FeaturedImage.url}`
                        : "/Images/BlogThumb.png"
                    }
                    initialLikes={item.likes || 0}
                    initialDislikes={item.dislikes || 0}
                  />
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


