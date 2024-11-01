import Link from "next/link";
import { dummyProducts } from "@/app/constant/shop";
import { MobileProductCard } from "..";
import { getProducts } from "@/lib/hygraph";

export default async function ProductGrid() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex gap-2 scrollbar-hidden overflow-x-scroll">
        {/* <div className="w-full lg:grid lg:grid-cols-3 px-4 md:px-2 lg:px-0 grid grid-cols-2 overflow-hidden gap-2"> */}
        {products.map((product) => (
          <div key={product.id} className="border">
            <Link href={`/shop/${product.id}`} target="_blank">
              <MobileProductCard
                image={product.thumbnail.url}
                title={product.title}
                price={product.salePrice}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
