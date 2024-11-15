import { getAllBlogIds, getBlogById } from "@/lib/hygraph";
import BlogDetailClient from "./BlogDetailClient";

// Use generateStaticParams in the App Router
export async function generateStaticParams() {
  const ids = await getAllBlogIds(); // Fetch dynamic IDs

  return ids.map((id) => ({
    id: id.toString(), // Ensure ID is a string
  }));
}


export default async function BlogDetailPage({ params }) {
  const { id } = params;

  // Fetch blog data on the server side
  const blog = await getBlogById(id);

  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return <BlogDetailClient blog={blog} />;
}