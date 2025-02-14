import BlogDetailPage from "./BlogDetailClient";

export async function generateStaticParams() {
  try {
    // Fetch data from API
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/blogs"
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

export default function BlogDetail({ params }) {
  return <BlogDetailPage params={params} />;
}
