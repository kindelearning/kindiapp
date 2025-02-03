import ActivityDetailClient from "../ActivityDetailClient";



export async function generateStaticParams() {
  try {
    // Fetch data from API
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/activities"
    );
    const { data } = await response.json();

    // Ensure data exists
    if (!Array.isArray(data) || data.length === 0) {
      console.error("⚠️ No activities found or API response is empty");
      return [];
    }

    // Log fetched document IDs for debugging
    console.log(
      "✅ Fetched activities document IDs:",
      data.map((activity) => activity.documentId)
    );

    return data.map((activity) => ({ id: activity.documentId })); // Use "documentId" instead of "id"
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return [];
  }
}

export default function ActivityDetailPage({ params }) {
  return <ActivityDetailClient params={params} />;
}
