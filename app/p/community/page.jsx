"use client";

import NewHeader from "@/app/Sections/Mobile/NewHeader";
import { BlogCard } from "@/app/Widgets";
import { useEffect, useState } from "react";
 
// function SearchInput({ value, onChange }) {
//   return (
//     <div className="flex w-full items-center bg-white rounded-full border border-gray-200">
//       <span className="px-3 text-gray-400">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//           />
//         </svg>
//       </span>
//       <Input
//         type="email"
//         placeholder="Search for products..."
//         value={value}
//         onChange={onChange}
//         className="w-full border-0 rounded-full focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0   focus:border-0 focus-within:border-0 px-3 py-2"
//       />
//     </div>
//   );
// }

// export default function Community() {
//   const [blogs, setBlogs] = useState([]); // Initialize as an empty array
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredBlogs, setFilteredBlogs] = useState([]); // Initialize as an empty array

//   // Fetch blogs on component mount
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const data = await getPublishedPosts();
//       setBlogs(data);
//       setFilteredBlogs(data); // Initialize filteredBlogs with all blogs
//     };

//     fetchBlogs();
//   }, []);

//   // Function to handle search input change
//   const handleSearchChange = (event) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTerm(term);

//     // Filter blogs based on search term
//     const filtered = blogs.filter((blog) =>
//       blog.blogTitle.toLowerCase().includes(term)
//     );
//     setFilteredBlogs(filtered);
//   };

//   if (!blogs || blogs.length === 0) {
//     return (
//       <div>
//         <Error />
//       </div>
//     );
//   }

//   return (
//     <>
//       <NewHeader headerText="Community" />
//       <section className="w-full h-auto z-50 -mt-[8px] rounded-t-[16px] pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
//         <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
//           <div className="claracontainer w-full flex flex-col overflow-hidden gap-2 md:gap-4">
//             <div className="w-full text-center">
//               <span className="text-[#3f3a64] text-[32px] tracking-tight font-semibold font-fredoka uppercase leading-10">
//                 The Kindi{" "}
//               </span>
//               <span className="text-[#f05c5c] text-[32px] font-semibold font-fredoka uppercase leading-10">
//                 Connect
//               </span>
//             </div>
//             <div className="w-full text-center px-0 md:px-12 lg:px-24 xl:px-28 text-[#3f3a64] clarabodyTwo">
//               Here&apos;s where you&apos;ll discover your daily educational play
//               activities. Utilize our drag-and-drop feature to rearrange
//               learning, ensuring development seamlessly fits your schedule.
//               Additionally, sync your schedule with your child&apos;s nursery
//               for a smooth and integrated learning experience.
//             </div>
//           </div>

//           {/* Search Input */}
//           <div className="w-full px-0">
//             <SearchInput
//               value={searchTerm}
//               onChange={handleSearchChange}
//               // className="w-full p-2 border rounded"
//             />
//           </div>

//           <div className="claracontainer w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 overflow-hidden gap-4">
//             {/* Render filtered blogs */}
//             {filteredBlogs.length > 0 ? (
//               filteredBlogs.map((blog) => (
//                 <div key={blog.id}>
//                   <Link
//                     href={`/p/community/${blog.id}`}
//                     onClick={() => console.log("Clicked Blog:", blog.blogTitle)}
//                   >
//                     <article className="bg-white rounded-lg">
//                       <BlogCard
//                         title={blog.blogTitle}
//                         metsDesc={blog.metaDescription}
//                         image={blog.thumbnail.url || BlogThumbTwo}
//                       />
//                     </article>
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <div className="flex w-full flex-col gap-2">
//                 <div className="w-full text-center clarabodyTwo text-red-500">
//                   No matching blogs found.
//                 </div>
//                 <div className="claracontainer w-full grid grid-cols-1 overflow-hidden gap-4">
//                   {filteredBlogs.map((blog) => (
//                     <div key={blog.id}>
//                       <Link
//                         href={`/p/community/${blog.id}`}
//                         onClick={() =>
//                           console.log("Clicked Blog:", blog.blogTitle)
//                         }
//                       >
//                         <article className="bg-white rounded-lg">
//                           <BlogCard
//                             title={blog.blogTitle}
//                             metsDesc={blog.metaDescription}
//                             image={blog.thumbnail.url || BlogThumb}
//                           />
//                         </article>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentThemes, setCurrentThemes] = useState([]); // Store themes for the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/blogs?populate=comments&populate=FeaturedImage"
      );
      const data = await res.json();
      // console.log("API Response:", data);

      if (data && data.data) {
        // Extract comments from all blog entries
        const allComments = data.data.flatMap((blog) => blog.comments || []);
        // setComments(
        //   allComments.sort(
        //     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        //   )
        // );
        setBlogs(data.data);
        setTotalPages(Math.ceil(data.data.length / 12)); // Calculate total pages
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log("Fetched Blogs", blogs);

  useEffect(() => {
    // Paginate the themes
    const start = (currentPage - 1) * 4;
    const end = start + 4;
    setCurrentThemes(blogs.slice(start, end)); // Get the themes for the current page
  }, [blogs, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <NewHeader headerText="Community" />
      <section className="w-full h-auto bg-[#EAEAF5] items-center pb-32 justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer p-4 w-full flex flex-col items-center justify-center overflow-hidden gap-4 lg:gap-12">
            {/* <div className="claracontainer w-full flex flex-col overflow-hidden gap-2 md:gap-4">
              <div className="w-full text-center">
                <span className="text-[#3f3a64] text-[32px] tracking-tight font-semibold font-fredoka uppercase leading-10">
                  The Kindi{" "}
                </span>
                <span className="text-[#f05c5c] text-[32px] font-semibold font-fredoka uppercase leading-10">
                  Connect
                </span>
              </div>
              <div className="w-full text-center px-0 md:px-12 lg:px-24 xl:px-28 text-[#3f3a64] clarabodyTwo">
                Here&apos;s where you&apos;ll discover your daily educational
                play activities. Utilize our drag-and-drop feature to rearrange
                learning, ensuring development seamlessly fits your schedule.
                Additionally, sync your schedule with your child&apos;s nursery
                for a smooth and integrated learning experience.
              </div>
            </div> */}

            <div className="claracontainer ">
              {blogs.length === 0 ? (
                <div>Loading...</div> // Loading state
              ) : (
                <div className="grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full claracontainer">
                  {blogs.map((item) => (
                    <article key={item.id} className="rounded-lg">
                      <BlogCard
                        documentId={item.documentId}
                        addUrl={`/p/community/${item.documentId}`}
                        metsDesc={
                          item?.MetaDescription ||
                          "  discover your daily educational  play activities. Utilize our drag-and-drop feature to rearrange  learning, ensuring development  "
                        }
                        title={item?.Text || "Untitled Post"}
                        image={
                          item?.FeaturedImage
                            ? `https://lionfish-app-98urn.ondigitalocean.app${item?.FeaturedImage?.url}`
                            : "/Images/BlogThumb.png"
                        }
                        initialLikes={item.likes || 0} // Replace with actual value from your CMS
                        initialDislikes={item.dislikes || 0} // Replace with actual value from your CMS
                      />
                    </article>
                  ))}
                </div>
              )}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="self-center text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
