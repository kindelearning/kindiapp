import { ProductDetailClient } from "@/app/Sections";
import { getAllProductIds, getProductById } from "@/lib/hygraph";

export async function generateStaticParams() {
  const ids = await getAllProductIds();
  return ids.map((id) => ({
    id: id.toString(),
  }));
}



export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const fetchedProduct = await getProductById(id);

  if (!fetchedProduct) {
    return <div>Product not found!</div>;
  }

  return <ProductDetailClient product={fetchedProduct} />;
}
