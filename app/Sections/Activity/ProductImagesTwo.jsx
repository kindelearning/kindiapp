"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex claracontainer w-full flex-col items-start">
      {/* Featured Image */}
      <div className="w-full rounded-[16px] h-full max-h-[400px] md:h-full lg:max-h-[400px] bg-clip-content flex items-center justify-center">
        <Image
          src={mainImage}
          className="rounded-[0px] object-contain  h-full max-h-[400px] md:h-full lg:max-h-[400px] w-full md:rounded-[16px]"
          alt="Product Image"
        />
      </div>
      <div className="flex max-w-[600px] px-2 scrollbar-hidden w-full overflow-x-auto py-4">
        <div className="flex flex-nowrap scrollbar-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[100px] flex h-[80px] cursor-pointer object-cover border-2 border-transparent hover:scale-105 duration-150 mr-4 ${
                mainImage === image ? "border-red" : ""
              }`}
              onClick={() => setMainImage(image)}
            >
              <Image
                src={image}
                width={100}
                height={80}
                className="object-cover w-full h-full rounded-[12px]"
                alt="Product Image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
