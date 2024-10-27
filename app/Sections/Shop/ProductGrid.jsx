
import Link from "next/link";
import { dummyProducts } from "@/app/constant/shop";
import { MobileProductCard } from "..";

export default async function ProductGrid() {
  // const products = await getProducts();

  // if (!products || products.length === 0) {
  //   return (
  //     <div>
  //       <NotFound />
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="w-full flex gap-2 scrollbar-hidden overflow-x-scroll">
        {dummyProducts.map((product) => (
          <div key={product.id} className="border">
            <Link href={`/shop/slug`} target="_blank">
              <MobileProductCard
                image={product.image}
                title={product.title}
                price={product.price}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
