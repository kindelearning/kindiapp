"use client"; // This is now a client component

const scrollToCommentSection = () => {
  const commentSection = document.getElementById("comment_Section");
  if (commentSection) {
    commentSection.scrollIntoView({ behavior: "smooth" });
  }
};

const getRandomPastDate = () => {
  // Set the range for the random date
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  // Generate a random timestamp between one year ago and now
  const randomTimestamp =
    oneYearAgo.getTime() +
    Math.random() * (now.getTime() - oneYearAgo.getTime());

  return new Date(randomTimestamp);
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getRandomLikes = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ProfilePictureComponent = () => {
  const [profilePictures, setProfilePictures] = useState([]);
  const [randomPicture, setRandomPicture] = useState(null);

  useEffect(() => {
    const loadProfilePictures = async () => {
      const pictures = await fetchProfilePictures();
      setProfilePictures(pictures);
      // Set a random picture
      if (pictures.length > 0) {
        const randomIndex = Math.floor(Math.random() * pictures.length);
        setRandomPicture(pictures[randomIndex]);
      }
    };

    loadProfilePictures();
  }, []);

  return (
    <div className="profile-picture">
      {randomPicture ? (
        <Image
          src={randomPicture.url}
          alt="Profile Picture"
          className="rounded-full w-8 h-8"
        />
      ) : (
        <Image
          src={ProfilePlaceHolderOne}
          alt="Profile Picture"
          className="rounded-full w-8 h-8"
        />
      )}
    </div>
  );
};

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const randomLikes = Math.floor(Math.random() * 100); // Example for random likes count

  // Load the like state from local storage on component mount
  useEffect(() => {
    const liked = localStorage.getItem("isLiked");
    if (liked === "true") {
      setIsLiked(true);
    }
  }, []);

  const handleLikeClick = () => {
    setIsLiked(true); // Change to true when clicked
    setAnimate(true); // Start the animation

    // Save the like state to local storage
    localStorage.setItem("isLiked", "true");

    // Stop the animation after 1.5 seconds
    setTimeout(() => {
      setAnimate(false);
    }, 1500);
  };

  return (
    <div className="w-full cursor-pointer items-center flex flex-row justify-start gap-2">
      <div
        className={`text-[#f05c5c] text-[10px] font-semibold font-fredoka leading-none 
                      ${animate ? "animate-bounce" : ""}`} // Add bounce animation on like
        onClick={handleLikeClick}
      >
        {isLiked ? "Liked" : "Like"}
      </div>
      {!isLiked && (
        <div className="text-[#0a1932] text-[10px] font-semibold font-fredoka leading-none">
          {randomLikes}+
        </div>
      )}

      <Image
        src={LikeIcon}
        alt="CommentLikeIcon"
        className="w-3 h-3 cursor-pointer" // Add cursor-pointer for better UX
        onClick={handleLikeClick} // Make icon clickable too
      />
    </div>
  );
};

// Helper function to generate random numbers within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { ShareButton } from "@/app/Sections";
import { likeBlogPost } from "@/lib/hygraph";
import { CommentIcon, LikeIcon } from "@/public/Images";

export default function BlogDetailClient({ blog }) {
  const [likeCount, setLikeCount] = useState(blog.likeCount || 0); // Use initial like count from blog data
  const [isLiking, setIsLiking] = useState(false);

  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/p/community/${blog.id}`;

  const handleLikeClick = async () => {
    if (isLiking) return;
    setIsLiking(true);

    const updatedLikeCount = await likeBlogPost(blog.id, likeCount);
    if (updatedLikeCount !== null) {
      setLikeCount(updatedLikeCount);
      console.log("Updated Like Count:", updatedLikeCount);
    }

    setIsLiking(false);
  };

  return (
    <>
      <Head>
        <title>{blog.blogTitle}</title>
        <meta name="description" content={blog.blogDescription} />
        <meta property="og:title" content={blog.blogTitle} />
        <meta property="og:description" content={blog.blogDescription} />
        <meta property="og:image" content={blog.thumbnail.url} />
        <meta property="og:url" content={blogUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kindlearning" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.blogTitle} />
        <meta name="twitter:description" content={blog.blogDescription} />
      </Head>
      <section className="w-full h-auto py-0 lg:py-12 bg-[#EAEAF5] items-center justify-center pb-24 flex flex-col gap-[20px]">
        <div className="flex overflow-clip lg:rounded-xl lg:max-w-[960px] w-full">
          <Image
            src={blog.thumbnail.url}
            alt={blog.blogTitle}
            width={800}
            height={450}
            className="w-full hover:scale-105 duration-300 lg:max-w-[960px] lg:rounded-xl h-60 md:h-[400px] lg:h-[400px] object-cover"
          />
        </div>
        <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          <div className="w-full mx-auto flex flex-col gap-4 justify-center items-center">
            <div className="flex max-w-4xl w-full mx-auto justify-start items-start">
              <div className="flex w-full justify-between gap-4 items-center">
                <div className="flex gap-4 items-center justify-start">
                  <div className="flex items-center">
                    <button
                      className={`text-red bg-[#FBCECE] rounded-full p-2 hover:text-[#da4848] ${
                        isLiking ? "opacity-50" : ""
                      }`}
                      onClick={handleLikeClick}
                    >
                      <Image alt="Kindi" src={LikeIcon} /> {/* Update path */}
                    </button>
                    <span className="ml-2 text-[#0a1932] font-fredoka font-medium">
                      {likeCount}
                    </span>
                  </div>
                  <button href="#comment_Section" className="flex items-center">
                    <button
                      onClick={scrollToCommentSection} // Ensure you have this function defined
                      className="text-[#0a1932] bg-[#f8f8f8] rounded-full p-2 hover:text-[#0a1932]"
                    >
                      <Image alt="Kindi" src={CommentIcon} />{" "}
                      {/* Update path */}
                    </button>
                    {blog.comments.length}+
                  </button>
                </div>
                <div className="flex items-center">
                  <ShareButton url={blogUrl} />
                </div>
              </div>
            </div>
            <div className="flex max-w-4xl w-full flex-col gap-4">
              <hr className="border-1 my-3 rounded-full w-full h-[2px] border-[#000000]" />
              <div className="w-full text-[#3f3a64] claraheading">
                {blog.blogTitle}
              </div>
              <div className="w-full text-[#0a1932] text-2xl font-normal font-fredoka leading-[28px]">
                {blog.metaDescription}
              </div>
              <div className="content py-4 flex flex-col gap-2 justify-center">
                <div dangerouslySetInnerHTML={{ __html: blog.content.html }} />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-1 my-3 rounded-full w-full h-[2px] border-[#c7c7c7]" />
        {/* Comments Section */}
      </section>
    </>
  );
}
