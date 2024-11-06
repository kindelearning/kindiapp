import { getAllThemeIds, getThemeById } from "@/lib/hygraph";
import ThemeDetailClient from "./ThemeDetailClient";

// Fetch dynamic IDs for static generation in the App Router
export async function generateStaticParams() {
  const ids = await getAllThemeIds(); // Fetch theme IDs dynamically
  console.log("Themes Ids:", ids); // Debugging - Remove for production

  return ids.map((id) => ({
    id: id.toString(), // Ensure ID is a string
  }));
}

export default async function ThemeDetailPage({ params }) {
  const { id } = params;

  // Fetch theme data on the server side based on ID
  const theme = await getThemeById(id);

  if (!theme) {
    return <div>Theme not found!</div>; // Show message if theme doesn't exist
  }

  return <ThemeDetailClient theme={theme} />; // Pass theme data to client component
}
