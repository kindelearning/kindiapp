import { getAllBlogIds, getBlogById } from "@/lib/hygraph";
import BlogDetailPage from "./BlogDetailClient";

// Use generateStaticParams in the App Router
export async function generateStaticParams() {
  
  try {
    // Fetch data from API
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/our-themes"
    );
    const { data } = await response.json();

    // Ensure data exists
    if (!Array.isArray(data) || data.length === 0) {
      console.error("⚠️ No blogs found or API response is empty");
      return [];
    }

    // Log fetched document IDs for debugging
    console.log(
      "✅ Fetched blog document IDs:",
      data.map((blog) => blog.documentId)
    );

    return data.map((blog) => ({ id: blog.documentId })); // Use "documentId" instead of "id"
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return [];
  }
}
 
async function fetchBlogById(documentId) {
  const res = await fetch(
    `https://lionfish-app-98urn.ondigitalocean.app/api/blogs/${documentId}?populate=*`
  );
  const data = await res.json();

  if (!data || !data.data) {
    return null; // If data is not found
  }

  return data.data;
}

// export default async function BlogDetail({ params }) {
//   const { id } = params;

//   // Fetch blog data on the server side
//   const blog = await getBlogById(id);

//   if (!blog) {
//     return <div>Blog not found!</div>;
//   }

//   return <BlogDetailPage blog={blog} />;
// }