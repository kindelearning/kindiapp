"use client";
import { Send } from "lucide-react";
import { useState } from "react";

export function CommentForm({ blogId, onCommentAdded }) {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setError("Comment text is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://lionfish-app-98urn.ondigitalocean.app/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Text: commentText,
              blog: blogId, // Assuming you have a relationship between comments and blogs
            },
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Successfully added comment
        setCommentText("");
        onCommentAdded(data.data); // Add new comment to the list
      } else {
        setError("Error adding comment");
      }
    } catch (error) {
      setError("Error adding comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#80808000] font-fredoka w-full rounded-full  mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center bg-white rounded-full border shadow-sm">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              rows="1"
              className="flex-1 p-3 border-none focus:ring-0 focus:outline-none rounded-l-full resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-12 h-12 bg-red text-white rounded-r-full hover:bg-hoverRed disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-t-2 rounded-r-full border-white rounded-full"></div>
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </>
  );
}
// const CommentForm = ({ blogId }) => {
//   const [name, setName] = useState("");
//   const [content, setContent] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const commentData = {
//       name,
//       content,
//       blogId,
//     };

//     setIsSubmitting(true);
//     setMessage(""); // Clear any existing messages

//     try {
//       const response = await fetch("/api/comments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(commentData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         setMessage(
//           `Failed to submit comment: ${result.message || "Unknown error"}`
//         );
//         setIsSubmitting(false);
//         return;
//       }

//       setMessage("Comment submitted successfully!");
//       setName("");
//       setContent("");
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//       setMessage("Failed to submit comment. Please try again.");
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="flex mt-6 flex-col w-full gap-2">
//         <div className="w-full text-[#3f3a64] clarabodyTwo font-fredoka capitalize">
//           Add your Comment
//         </div>

//         <Input
//           type="text"
//           placeholder="Your Name"
//           value={name}
//           aria-label="Your Name"
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="border-2 bg-white font-fredoka rounded-[8px] focus:border-black focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white  "
//         />
//         <Textarea
//           placeholder="Your Comment"
//           value={content}
//           aria-label="Your Comment"
//           onChange={(e) => setContent(e.target.value)}
//           required
//           // className="w-full rounded-[8px] object-cover overflow-clip flex "
//           className="border-2 bg-white font-fredoka max-h-[200px] h-[50px] rounded-[8px] focus:border-black focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white  "
//         />
//         <Button
//           type="submit"
//           disabled={isSubmitting}
//           className="p-2 bg-red border-transparent hover:bg-hoverRed border-2 duration-200 ease-in-out hover:border-white font-fredoka flex flex-row items-center justify-center gap-2 text-white rounded-md"
//         >
//           <Send />
//           {isSubmitting ? "Submitting..." : "Submit Comment"}
//         </Button>
//         {message && (
//           <p
//             className={`text-sm ${
//               response.ok ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </>
//   );
// };

// export default CommentForm;
