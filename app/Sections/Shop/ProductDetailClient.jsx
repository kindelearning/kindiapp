"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import NotFound from "@/app/not-found";
import Image from "next/image";
import { creditCard, Ratings, ShopImage } from "@/public/Images";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { loadStripe } from "@stripe/stripe-js";
import {
  ProductGrid,
  ProductImages,
  QuantityControl,
  ReviewGrid,
  ShopHeader,
} from "..";
import { useCart } from "@/app/context/CartContext";
import NewHeader from "../Mobile/NewHeader";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewData = {
      name,
      email,
      content,
      rating: parseInt(rating, 10),
    };

    setIsLoading(true); // Start loading

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          `Failed to submit review: ${data.message || "Unknown error"}`
        );
        setIsLoading(false); // Stop loading on error

        return;
      }

      setMessage("Review submitted successfully!");
      setName("");
      setEmail("");
      setContent("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Failed to submit review. Please try again.");
    }
    setIsLoading(false); // Stop loading after submission
  };

  return (
    <form
      className="w-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="claracontainer w-full py-6 flex flex-col gap-4 justify-between items-start">
        <div className="w-full object-contain overflow-clip">
          <Image
            alt="Kindi"
            src={ShopImage}
            className="w-full rounded-[8px] object-cover overflow-clip flex h-[200px]"
          />
        </div>
        <div className="flex w-full flex-col gap-2 justify-start items-start claracontainer">
          <div className="claracontainer w-full flex flex-col gap-2 justify-between items-start">
            <div className="w-full text-[#3f3a64] clarabodyTwo font-fredoka capitalize">
              Add your Comments
            </div>{" "}
            <div className="w-full flex lg:flex-row flex-col gap-2 justify-between items-center">
              <Input
                type="text"
                placeholder="Name..."
                value={name}
                className="border-2 focus:border-black focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white border-[#b4b4b4] "
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                className="border-2 focus:border-black focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white border-[#b4b4b4] "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Add your review..."
              className="w-full p-4 focus-within:ring-0 focus-visible:ring-0 ring-white ring-offset-0 text=[#0f172a] py-4 text-start rounded-lg border-2 border-[#b4b4b4] justify-center items-center gap-2.5 inline-flex"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="flex flex-row justify-between items-center w-full">
              <div className="text-center text-red clarabodyTwo">
                Give us Rating out of 5-Stars
              </div>
              <div className="flex gap-1 items-center">
                <Image
                  className="w-2 h-2 lg:w-4 lg:h-4"
                  src={Ratings}
                  alt="Rating"
                />
                <Image
                  className="w-2 h-2 lg:w-4 lg:h-4"
                  src={Ratings}
                  alt="Rating"
                />
                <Image
                  className="w-2 h-2 lg:w-4 lg:h-4"
                  src={Ratings}
                  alt="Rating"
                />
                <Image
                  className="w-2 h-2 lg:w-4 lg:h-4"
                  src={Ratings}
                  alt="Rating"
                />
                <Image
                  className="w-2 h-2 lg:w-4 lg:h-4"
                  src={Ratings}
                  alt="Rating"
                />
              </div>
            </div>
            <Input
              type="number"
              placeholder="Rating"
              value={rating}
              className="border-2 focus-within:ring-0 ring-offset-0 focus-visible:ring-0 ring-white border-[#b4b4b4] "
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
            />
          </div>
        </div>
      </div>

      <Button
        disabled={isLoading}
        className="clarabutton bg-red hover:bg-hoverRed"
        type="submit"
      >
        {/* Submit Review */}
        {isLoading ? "Submitting..." : "Submit Review"}{" "}
        {/* Change text based on loading */}
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default function ProductDetailClient({ product }) {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrement function
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleAddToCart = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    addToCart({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.salePrice,
      image: product.productImages[0]?.url,
      quantity,
    });
    setLoading(false);
    router.push("/shop/cart");
  };

  return (
    <>
      {/* <ShopHeader className="sticky" /> */}
      <NewHeader
        headerText={product.title}
        className="sticky"
        dynamicBgColor="#F5F5F5"
      />
      <section className="w-full h-auto bg-[#F5F5F5] lg:bg-[#eaeaf5] items-center justify-center py-4 plg:pb-32 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          {/* Row 1 */}
          <div className="flex w-full flex-col md:flex-col lg:flex-row xl:flex-row gap-8 justify-between items-start">
            {/* column1 */}
            <div className="claracontainer py-0 flex flex-col justify-between items-start gap-8">
              <ProductImages
                images={product.productImages.map((img) => img.url)}
              />
            </div>
            {/* col 2 */}
            <div className="claracontainer py-0 flex w-full flex-col lg:max-w-[48%] justify-between items-start gap-4">
              <div className="w-full hidden md:hidden lg:flex text-[#3f3a64] text-[32px] leading-normal font-semibold font-fredoka capitalize">
                {product.title}
              </div>
              <div className="claracontainer w-full flex md:flex lg:hidden xl:hidden flex-row p-0 justify-start items-start gap-1">
                {/* Product Title */}
                <div className="w-full flex md:flex lg:hidden xl:hidden text-[#0a1932] text-[28px] font-semibold font-['Fredoka'] leading-[30px]">
                  {product.title}
                </div>
              </div>
              {/* Product Pricing */}
              <div className="claracontainer w-full flex flex-row p-0 justify-start items-start gap-1">
                <div className="w-[max-content] text-red text-[40px] leading-[40px]  font-semibold font-fredoka ">
                  ${product.salePrice}
                </div>
                <div className="w-full text-gray-500 text-[24px] leading-[24px] font-semibold font-fredoka line-through ">
                  ${product.actualPrice}
                </div>
              </div>
              {/* ratings */}
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
              {/* Content */}
              <div className="claracontainer">
                <div className="w-[max-content] text-[#0a1932] text-[32px] font-semibold font-fredoka leading-tight">
                  Description
                </div>
                <div className="w-full text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description.html,
                    }}
                  />
                </div>
              </div>
              {/* CTA */}
              <div className="claracontainer flex flex-col w-full gap-1">
                <div className="claracontainer w-full justify-between items-start flex flex-row gap-4">
                  {/* <QuantityControl /> */}
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
                  {/* Pass quantity state to QuantityControl */}
                  <div className="w-full flex flex-col gap-1">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={loading}
                        className="bg-red hover:bg-hoverRed w-full  rounded-[16px] border-2 border-[white]"
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
          {/* Row 2 | Recent product */}
          <div className="flex w-full flex-col justify-start items-center">
            <div className="text-[#0a1932] text-[20px] lg:text-[28px] font-semibold font-fredoka text-start w-full ">
              Recently Viewed
            </div>
            <ProductGrid />
          </div>
          {/* Row- 3 | Add Review */}
          <div className="flex w-full flex-col justify-start items-center">
            <div className="flex justify-between w-full items-center">
              <div className="text-[#0a1932] text-[20px] lg:text-[28px]  font-semibold font-fredoka text-start w-full leading-loose">
                Customer Reviews
              </div>
              <Dialog className="p-2 lg:p-4">
                <DialogTrigger>
                  <div className="text-center w-[max-content]  text-red clarabodyTwo font-semibold capitalize ">
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
                      <ReviewForm />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            <ReviewGrid />
          </div>
          {/* Row- 4 | Similar Product*/}
          <div className="flex w-full pb-20 flex-col justify-start items-center">
            <div className="text-[#0a1932] text-[20px] lg:text-[28px]  font-semibold font-fredoka text-start w-full leading-loose">
              You May also like
            </div>
            <ProductGrid />
          </div>
        </div>
      </section>
      {/* Row- 5 (Mobile CTA's) */}
      <div className="flex w-full z-20 lg:hidden md:hidden flex-col pb-20 fixed bottom-0 justify-start items-center">
        <div className="claracontainer px-4 py-4 w-full bg-[#ffffff] rounded-t-[24px] shadow-upper sticky bottom-0 z-12 justify-between items-center flex flex-row gap-4">
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
          <Button
            type="button"
            onClick={handleAddToCart}
            disabled={loading} // Disable button when loading
            className="bg-red w-full rounded-[16px] border-2 border-[white]"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </>
  );
}
