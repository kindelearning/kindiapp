"use client";

import { fetchShopProducts } from "@/app/data/p/Dynamic/Shop";
import { Ratings } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export function LocalProductCard2({ image, productUrl = "#", title, price }) {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    const generateRandomRating = () => {
      const min = 3;
      const max = 4.8;
      const randomRating = (Math.random() * (max - min) + min).toFixed(1);
      return randomRating;
    };

    setRating(generateRandomRating());
  }, []);

  return (
    <Link
      href={productUrl}
      target="_blank"
      className="flex md:max-w-[300px] min-w-[170px] md:min-w-[300px] md:w-full lg:min-w-[240px] w-full flex-col rounded-[16px] items-center gap-2 lg:gap-4 bg-white hover:shadow-md"
    >
      <div className="flex rounded-t-[16px] overflow-clip w-full">
        <Image
          // src={`https://lionfish-app-98urn.ondigitalocean.app${image}`}
          src={image}
          alt={title}
          width={200}
          height={200}
          className="w-full hover:scale-110 duration-300 h-[160px] md:h-[220px] rounded-t-[16px] object-cover"
        />
      </div>
      <div className="claracontainer flex flex-col justify-start min-h-[80px] pb-2 md:min-h-[100px] items-start w-full gap-2">
        <div className="flex items-center px-2 w-full justify-between gap-2">
          <h1 className="flex text-[24px] leading-tight font-semibold text-[#0A1932] font-fredoka">
            £ {price || "29"}
          </h1>
          <div className="flex flex-row justify-center gap-[2px] items-center">
            <Image
              alt="Kindi"
              src={Ratings}
              className="text-yellow-400 w-4 h-4"
            />
            <span className="text-right text-[#0a1932] clarabodyTwo">
              {rating}+
            </span>
          </div>
        </div>
        <h3 className="text-start flex md:hidden text-[#0a1932] clarabodyTwo font-medium w-full px-2 ">
          {title.length > 20 ? `${title.slice(0, 18)}...` : title}
        </h3>
        <h3 className="text-start hidden md:flex text-[#0a1932] clarabodyTwo font-medium w-full px-2 ">
          {title.length > 30 ? `${title.slice(0, 24)}...` : title}
        </h3>
      </div>
    </Link>
  );
}

export function LocalProductCard({
  image,
  productUrl = "#",
  title = "Unnamed Product",
  price = "N/A",
}) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating((Math.random() * (4.8 - 3) + 3).toFixed(1));
  }, []);

  const truncatedTitle = useMemo(() => {
    return title.length > 30 ? `${title.slice(0, 24)}...` : title;
  }, [title]);

  return (
    <Link
      href={productUrl}
      target="_blank"
      className="flex md:max-w-[300px] min-w-[170px] md:min-w-[300px] md:w-full lg:min-w-[240px] w-full flex-col rounded-[16px] items-center gap-2 lg:gap-4 bg-white hover:shadow-md"
    >
      {/* Product Image */}
      <div className="flex rounded-t-[16px] overflow-clip w-full">
        <Image
          src={image || "/Images/shop/ProductImage.png"} // Fallback Image
          alt={title}
          width={200}
          height={200}
          priority={false}
          className="w-full hover:scale-110 duration-300 h-[160px] md:h-[220px] rounded-t-[16px] object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="claracontainer flex flex-col justify-start min-h-[80px] pb-2 md:min-h-[100px] items-start w-full gap-2">
        <div className="flex items-center px-2 w-full justify-between gap-2">
          {/* Product Price */}
          <h1 className="flex text-[24px] leading-tight font-semibold text-[#0A1932] font-fredoka">
            £ {price}
          </h1>

          {/* Rating */}
          <div className="flex flex-row justify-center gap-[2px] items-center">
            <Image alt="Rating Icon" src={Ratings} className="w-4 h-4" />
            <span className="text-right text-[#0a1932] clarabodyTwo">
              {rating}+
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-start text-[#0a1932] clarabodyTwo font-medium w-full px-2">
          {truncatedTitle}
        </h3>
      </div>
    </Link>
  );
}

export default function MobileProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Products with Error Handling
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const data = await fetchShopProducts(signal);

      if (!Array.isArray(data)) throw new Error("Invalid product data");
      const filteredProducts  = data.filter(
        (item) => item.additionalField === "shop"
      );

      setProducts(filteredProducts);
      // setProducts(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to load products. Please try again.");
        console.error("Error fetching products:", err);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="w-full h-auto bg-[#F5F5F5] py-4 flex flex-col md:flex-row gap-5 transition-all animate-fade-in duration-300 items-center">
      <div className="claracontainer w-full flex flex-col gap-4 items-center">
        {/* Header */}
        <div className="flex justify-between px-4 items-center w-full">
          <h1 className="clarabodyTwo text-[#0A1932]">Latest Resources</h1>
          <Link
            href="/shop"
            className="clarabodyTwo text-red min-w-[max-content]"
          >
            View All
          </Link>
        </div>

        {/* Content Section */}
        <div className="grid w-full pl-4 grid-cols-2 gap-4">
          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products available.</p>
          ) : (
            products.map((product) => (
              <LocalProductCard
                key={product.documentId}
                productUrl={
                  product.documentId ? `/shop/${product.documentId}` : "#"
                }
                image={
                  Array.isArray(product?.FeaturedImage) &&
                  product?.FeaturedImage.length > 0
                    ? `https://lionfish-app-98urn.ondigitalocean.app${product?.FeaturedImage[0]?.url}`
                    : "/Images/shop/ProductImage.png"
                }
                title={product?.Name || "Unnamed Product"}
                price={product?.DiscountPrice || "N/A"}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
