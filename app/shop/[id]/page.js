import { ProductDetailClient } from "@/app/Sections";


export async function generateStaticParams() {
  try {
    // Fetch data from API
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/products"
    );
    const { data } = await response.json();

    // Ensure data exists
    if (!Array.isArray(data) || data.length === 0) {
      console.error("⚠️ No product found or API response is empty");
      return [];
    }

    // Log fetched document IDs for debugging
    console.log(
      "✅ Fetched product document IDs:",
      data.map((product) => product.documentId)
    );

    return data.map((product) => ({ id: product.documentId })); // Use "documentId" instead of "id"
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return [];
  }
}
export default function ProductDetailPage({ params }) {
  return <ProductDetailClient params={params} />;
}
