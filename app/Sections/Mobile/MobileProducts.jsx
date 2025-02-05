"use client";

import { fetchShopProducts } from "@/app/data/p/Dynamic/Shop";
import { Ratings } from "@/public/Images";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export function LocalProductCard({ image, productUrl = "#", title, price }) {
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

export default function MobileProducts({}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchShopProducts();
      setProducts(data);
    };
    // console.log("FetchActivities", fetchProducts);

    fetchProducts();
  }, []);
  return (
    <>
      <section className="w-full h-auto bg-[#F5F5F5] items-center justify-center py-4 flex transition-all animate-fade-in  duration-300 flex-col md:flex-row gap-[20px]">
        <div className="claracontainer w-full flex-col justify-start gap-4 items-center script inline-flex">
          <div className="flex justify-between px-4  items-center w-full">
            <h1 className="clarabodyTwo text-[#0A1932] w-full justify-start items-center text-start">
              Latest Resources
            </h1>
            <Link
              href="/shop"
              className="clarabodyTwo text-red min-w-[max-content] justify-start items-center text-start"
            >
              View All
            </Link>
          </div>

          <div className="grid claracontainer w-full pl-4 flex-row  justify-between gap-4 grid-cols-2">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <LocalProductCard
                  key={product.documentId}
                  productUrl={`/shop/${product.documentId}` || "#"}
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
            ) : (
              <p className="text-gray-500">No products available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
