"use client";

import { ActivityImage, creditCard, Ratings } from "@/public/Images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import ReviewGrid from "@/app/shop/section/ReviewGrid";
import ProductGrid from "@/app/shop/section/ProductGrid";
import ProductMedia from "@/app/shop/section/ProductMedia";
import { ReviewForm } from "./ReviewForm";
import NewHeader from "../Mobile/NewHeader";

// import { ReviewForm } from "../sections/ReviewForm";
// import ProductMedia from "";

// export default function ProductDetailClient({ product }) {
//   const [loading, setLoading] = useState(false);
//   const { addToCart } = useCart();
//   const router = useRouter();
//   const [quantity, setQuantity] = useState(1);
//   const incrementQuantity = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   // Decrement function
//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity((prevQuantity) => prevQuantity - 1);
//     }
//   };
//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     addToCart({
//       id: product.id,
//       title: product.title,
//       description: product.description,
//       price: product.salePrice,
//       image: product.productImages[0]?.url,
//       quantity,
//     });
//     setLoading(false);
//     router.push("/shop/cart");
//   };

//   return (
//     <>
//       {/* <ShopHeader className="sticky" /> */}
//       <NewHeader
//         headerText={product.title ? product.title : "Products"}
//         className="sticky"
//         dynamicBgColor="#F5F5F5"
//       />
//       <section className="w-full h-auto bg-[#F5F5F5] lg:bg-[#eaeaf5] items-center justify-center py-4 plg:pb-32 flex flex-col md:flex-row gap-[20px]">
//         <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
//           {/* Row 1 */}
//           <div className="flex w-full flex-col md:flex-col lg:flex-row xl:flex-row gap-8 justify-between items-start">
//             {/* column1 */}
//             <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
//               <ProductImages
//                 images={product.productImages.map((img) => img.url)}
//               />
//             </div>
//             {/* col 2 */}
//             <div className="claracontainer py-0 flex w-full flex-col lg:max-w-[48%] justify-between items-start gap-4">
//               <div className="w-full hidden md:hidden lg:flex text-[#3f3a64] text-[32px] leading-normal font-semibold font-fredoka capitalize">
//                 {product.title}
//               </div>
//               <div className="claracontainer w-full flex md:flex lg:hidden xl:hidden flex-row p-0 justify-start items-start gap-1">
//                 {/* Product Title */}
//                 <div className="w-full flex md:flex lg:hidden xl:hidden text-[#0a1932] text-[28px] font-semibold font-['Fredoka'] leading-[30px]">
//                   {product.title}
//                 </div>
//               </div>
//               {/* Product Pricing */}
//               <div className="claracontainer w-full flex flex-row p-0 justify-start items-start gap-1">
//                 <div className="w-[max-content] text-red text-[40px] leading-[40px]  font-semibold font-fredoka ">
//                   ${product.salePrice}
//                 </div>
//                 <div className="w-full text-gray-500 text-[24px] leading-[24px] font-semibold font-fredoka line-through ">
//                   ${product.actualPrice}
//                 </div>
//               </div>
//               {/* ratings */}
//               <div className="w-full flex gap-1 items-center claracontainer">
//                 <div className="flex gap-1">
//                   <Image src={Ratings} alt="Rating" />
//                   <Image src={Ratings} alt="Rating" />
//                   <Image src={Ratings} alt="Rating" />
//                   <Image src={Ratings} alt="Rating" />
//                   <Image src={Ratings} alt="Rating" />
//                 </div>
//                 <div className="text-zinc-600 w-[max-content] text-sm font-medium font-fredoka leading-[20px]">
//                   157 Reviews
//                 </div>
//               </div>
//               {/* Content */}
//               <div className="claracontainer">
//                 <div className="w-[max-content] text-[#0a1932] text-[32px] font-semibold font-fredoka leading-tight">
//                   Description
//                 </div>
//                 <div className="w-full text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: product.description.html,
//                     }}
//                   />
//                 </div>
//               </div>
//               {/* CTA */}
//               <div className="claracontainer flex flex-col w-full gap-1">
//                 <div className="claracontainer w-full justify-between items-start flex flex-row gap-4">
//                   {/* <QuantityControl /> */}
//                   <div className="flex border-[#eaeaf5] w-fit min-w-[124px] items-center border-1 shadow-sm lg:shadow-none rounded-full overflow-hidden">
//                     <button
//                       onClick={decrementQuantity}
//                       className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200 ease-in-out"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M18 12H6"
//                         />
//                       </svg>
//                     </button>
//                     <span className="w-8 py-1 text-center text-gray-600 bg-white focus:outline-none appearance-none">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={incrementQuantity}
//                       className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-full text-gray-600 transition duration-200 ease-in-out"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                   {/* Pass quantity state to QuantityControl */}
//                   <div className="w-full flex flex-col gap-1">
//                     <div className="flex w-full items-center justify-between gap-2">
//                       <Button
//                         type="button"
//                         onClick={handleAddToCart}
//                         disabled={loading}
//                         className="bg-red hover:bg-hoverRed w-full  rounded-[16px] border-2 border-[white]"
//                       >
//                         {loading ? "Adding..." : "Add to Cart"}
//                       </Button>
//                     </div>
//                     <div className="w-full flex flex-row justify-start items-center gap-2">
//                       <Image alt="Kindi" src={creditCard} className="w-4 h-4" />
//                       <div className="text-zinc-600 text-sm text-start font-medium font-fredoka leading-[20px]">
//                         100% Secured Payment
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Row 2 | Recent product */}
//           <div className="flex w-full flex-col justify-start items-center">
//             <div className="text-[#0a1932] text-[20px] lg:text-[28px] font-semibold font-fredoka text-start w-full ">
//               Recently Viewed
//             </div>
//             <ProductGrid />
//           </div>
//           {/* Row- 3 | Add Review */}
//           <div className="flex w-full flex-col justify-start items-center">
//             <div className="flex justify-between w-full items-center">
//               <div className="text-[#0a1932] text-[20px] lg:text-[28px]  font-semibold font-fredoka text-start w-full leading-loose">
//                 Customer Reviews
//               </div>
//               <Dialog className="p-2 lg:p-4">
//                 <DialogTrigger>
//                   <div className="text-center w-[max-content]  text-red clarabodyTwo font-semibold capitalize ">
//                     Write a Review
//                   </div>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>
//                       <div className="text-center text-red lg:text-[32px] lg:font-semibold clarabodyTwo font-semibold capitalize ">
//                         Write a Review
//                       </div>
//                     </DialogTitle>
//                     <DialogDescription>
//                       <ReviewForm />
//                     </DialogDescription>
//                   </DialogHeader>
//                 </DialogContent>
//               </Dialog>
//             </div>

//             <ReviewGrid />
//           </div>
//           {/* Row- 4 | Similar Product*/}
//           <div className="flex w-full pb-20 flex-col justify-start items-center">
//             <div className="text-[#0a1932] text-[20px] lg:text-[28px]  font-semibold font-fredoka text-start w-full leading-loose">
//               You May also like
//             </div>
//             <ProductGrid />
//           </div>
//         </div>
//       </section>
//       {/* Row- 5 (Mobile CTA's) */}
//       <div className="flex w-full z-20 lg:hidden md:hidden flex-col pb-20 fixed bottom-0 justify-start items-center">
//         <div className="claracontainer px-4 py-4 w-full bg-[#ffffff] rounded-t-[24px] shadow-upper sticky bottom-0 z-12 justify-between items-center flex flex-row gap-4">
//           <div className="flex border-[#eaeaf5] w-fit min-w-[124px] items-center border-1 shadow-sm lg:shadow-none rounded-full overflow-hidden">
//             <button
//               onClick={decrementQuantity}
//               className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200 ease-in-out"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M18 12H6"
//                 />
//               </svg>
//             </button>
//             <span className="w-8 py-1 text-center text-gray-600 bg-white focus:outline-none appearance-none">
//               {quantity}
//             </span>
//             <button
//               onClick={incrementQuantity}
//               className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-full text-gray-600 transition duration-200 ease-in-out"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                 />
//               </svg>
//             </button>
//           </div>
//           <Button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={loading} // Disable button when loading
//             className="bg-red w-full rounded-[16px] border-2 border-[white]"
//           >
//             {loading ? "Adding..." : "Add to Cart"}
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// }

async function fetchProductById(documentId) {
  const res = await fetch(
    `https://lionfish-app-98urn.ondigitalocean.app/api/products/${documentId}?populate=Gallery&populate=FeaturedImage`
  );
  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  console.log("Prduct Data", data);
  return data.data; // Return the product data
}

export function Fallback({ message = "Something went wrong." }) {
  return (
    <div className="flex justify-center items-center text-lg text-gray-600 py-4">
      {message}
    </div>
  );
}

function MediaGallery({ gallery }) {
  return (
    <div className="claracontainer py-0 flex flex-col max-w-full lg:max-w-[60%] justify-between  items-start gap-8 sticky top-0 h-fit ">
      {gallery ? (
        <ProductMedia gallery={gallery} />
      ) : (
        <div className="w-full overflow-clip rounded-lg h-[300px] max-h-[300px] lg:h-[400px] lg:max-h-[400px] mb-4">
          <Image
            className="w-full h-full object-cover rounded-lg"
            alt="Placholder Image"
            src={ActivityImage}
          />
        </div>
      )}
    </div>
  );
}

function ProductInfo({ product }) {
  if (!product)
    return <Fallback message="Product information is unavailable" />;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full hidden md:hidden lg:flex text-[#3f3a64] text-[32px] leading-normal font-semibold font-fredoka capitalize">
        {product.Name || "Product Name"}
      </div>
      <div className="claracontainer w-full flex md:flex lg:hidden xl:hidden flex-row p-0 justify-start items-start gap-1">
        {/* Product Title */}
        <div className="w-full flex md:flex lg:hidden xl:hidden text-[#0a1932] text-[28px] font-semibold font-['Fredoka'] leading-[30px]">
          {product.Name || "Product Name"}
        </div>
      </div>
      {/* Product Pricing */}
      <div className="claracontainer w-full flex flex-row p-0 justify-start items-start gap-2">
        <span className="w-[max-content] text-red text-[40px] leading-[40px] text-4xl  font-semibold font-fredoka ">
          £ {product.DiscountPrice || "N/A"}
        </span>
        <span className="w-[max-content] text-gray-500 text-[24px] leading-[24px] font-semibold font-fredoka line-through ">
          £ {product.Price || "N/A"}
        </span>
      </div>
      <RatingGrid />
      <div className="claracontainer">
        <div className="w-[max-content] text-[#0a1932] text-[32px] font-semibold font-fredoka leading-tight">
          Description
        </div>
        <div className="w-full text-[#757575] prose text-[20px] font-medium font-fredoka leading-[24px]">
          <span dangerouslySetInnerHTML={{ __html: product.Description }} />
          <span dangerouslySetInnerHTML={{ __html: product.MetaDescription }} />
        </div>
      </div>
    </div>
  );
}

function RatingGrid() {
  // Assuming reviews can be fetched or passed as props

  return (
    <div className="reviews-section">
      <div className="w-full flex gap-1 items-center claracontainer">
        <div className="flex gap-1">
          <Image src={Ratings} alt="Rating" />
          <Image src={Ratings} alt="Rating" />
          <Image src={Ratings} alt="Rating" />
          <Image src={Ratings} alt="Rating" />
          <Image src={Ratings} alt="Rating" />
        </div>
        <div className="text-zinc-600 w-[max-content] text-sm font-medium font-fredoka leading-[20px]">
          157 Reviews
        </div>
      </div>
    </div>
  );
}

function RecentlyViewed({ SectionTitle }) {
  return (
    <div className="flex w-full flex-col justify-start items-center">
      <div className="text-[#0a1932] text-[20px] lg:text-[28px] font-semibold font-fredoka text-start w-full ">
        {SectionTitle || " You May also like"}
      </div>
      <ProductGrid />
    </div>
  );
}

function CustomerReviews({ formData }) {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="text-[#0a1932] text-[20px] lg:text-[28px]  font-semibold font-fredoka text-start w-full leading-loose">
        Customer Reviews
      </div>
      <Dialog className="p-2 lg:p-4">
        <DialogTrigger>
          <div className="text-center w-[max-content]  text-transparent clarabodyTwo font-semibold capitalize ">
            Write a Review
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="text-center text-red lg:text-[32px] lg:font-semibold clarabodyTwo font-semibold capitalize ">
                Write a Review
              </div>
            </DialogTitle>
            <DialogDescription>
              <ReviewForm params={formData} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function QuantityControl({
  quantity,
  incrementQuantity,
  decrementQuantity,
}) {
  return (
    <div className="flex border-[#eaeaf5] w-fit min-w-[124px] items-center border-1 shadow-sm lg:shadow-none rounded-full overflow-hidden">
      <button
        onClick={decrementQuantity}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18 12H6"
          />
        </svg>
      </button>
      <span className="w-8 py-1 text-center text-gray-600 bg-white focus:outline-none appearance-none">
        {quantity}
      </span>
      <button
        onClick={incrementQuantity}
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-full text-gray-600 transition duration-200 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
}
 
export default function ProductDetailPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Use the context here

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(id);
        setProduct(productData);
        console.log("Fetched Product: ", productData); // Debugging product data
      } catch (error) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      setProduct(null);
      setLoading(false);
      setError(null);
    };
  }, [id]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add product to cart
    addToCart({
      id: product.documentId,
      title: product.Name,
      description: product.MetaDescription,
      price: product.DiscountPrice, // In cents
      image: product.FeaturedImage?.url,
      quantity,
    });

    setLoading(false);

    // Redirect to cart page
    router.push("/shop/cart");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center py-8">Loading...</div>
    );
  }

  return (
    <>
      <NewHeader
        headerText={product.Name ? product.Name : "Products"}
        className="sticky"
        dynamicBgColor="#F5F5F5"
      />
      <section className="w-full h-auto justify-center items-start bg-[#F5F5F5] lg:bg-[#eaeaf5] py-4 plg:pb-32 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8 lg:gap-20">
          {/* Product Display */}
          <div className="flex w-full flex-col md:flex-col lg:flex-row xl:flex-row gap-8 justify-between items-start">
            <MediaGallery gallery={product.Gallery} />
            <div className="claracontainer lg:max-h-[600px] py-0 flex w-full flex-col scrollbar-hide lg:max-w-[48%]  justify-between items-start gap-4 overflow-y-auto  h-fit">
              <ProductInfo product={product} />
              <div className="claracontainer py-2 rounded-t-[12px] shadow-none lg:bg-[#eaeaf5] lg:shadow-[0px_-4px_8px_rgba(0,0,0,0.1)] lg:shadow-[#f0f0fb7e] lg:sticky lg:bottom-0 flex flex-col w-full gap-1">
                <div className="claracontainer w-full justify-between items-start flex flex-row gap-4">
                  <QuantityControl
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                    quantity={quantity}
                  />
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Button
                        type="button"
                        onClick={handleCheckout}
                        disabled={loading}
                        className="bg-red checkout-button hover:bg-hoverRed w-full rounded-[16px] border-2 border-[white]"
                      >
                        {loading ? "Adding..." : "Add to Cart"}
                      </Button>
                    </div>
                    <div className="w-full flex flex-row justify-start items-center gap-2">
                      <Image alt="Kindi" src={creditCard} className="w-4 h-4" />
                      <div className="text-zinc-600 text-sm text-start font-medium font-fredoka leading-[20px]">
                        100% Secured Payment
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RecentlyViewed SectionTitle="Recent product" />
          <div className="flex w-full flex-col justify-start items-center">
            <CustomerReviews formData={params} />
            <ReviewGrid />
          </div>
          <RecentlyViewed SectionTitle="You May also like" />
        </div>
      </section>
      <div className="flex w-full z-20 lg:hidden md:hidden pb-20 fixed bottom-0 justify-start items-center">
        <div className="claracontainer px-4 py-4 w-full bg-[#ffffff] rounded-t-[24px] shadow-upper sticky bottom-0 z-12 justify-between items-center flex flex-row gap-4">
          <QuantityControl
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            quantity={quantity}
          />
          <Button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="bg-red checkout-button w-full rounded-[16px] border-2 border-[white]"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </>
  );
}
