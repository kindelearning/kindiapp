import { getActivityById, getAllActivityIds } from "@/lib/hygraph";
import ActivityDetailClient from "../ActivityDetailClient";

export async function generateStaticParams() {
  const ids = await getAllActivityIds(); // Fetch dynamic IDs
  console.log("All Ids", ids);

  return ids.map((id) => ({
    id: id.toString(), // Ensure ID is a string
  }));
}

export default async function ActivityDetailPage({ params }) {
  const { id } = params;

  const fetchedActivity = await getActivityById(id);

  if (!fetchedActivity) {
    return <div>Activity not found!</div>;
  }

  return <ActivityDetailClient activity={fetchedActivity} />;
}
