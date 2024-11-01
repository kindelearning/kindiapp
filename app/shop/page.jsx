"use client";
import { Input } from "@/components/ui/input";
import { ProductImage } from "@/public/Images";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Banner,
  BottomNavigation,
  CardGroup,
  Header,
  MobileProductCard,
  NewsLetter,
} from "../Sections";
import { dummyProducts } from "../constant/shop";
import Link from "next/link";
import { getProducts } from "@/lib/hygraph";
import { useEffect, useRef, useState } from "react";
import NotFound from "../not-found";

function SearchInput({ value, onChange }) {
  return (
    <div className="flex w-full items-center bg-white rounded-full border border-gray-200">
      <span className="px-3 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <Input
        type="text"
        placeholder="Search for products..."
        value={value}
        onChange={onChange}
        className="w-full border-0 rounded-full focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0   focus:border-0 focus-within:border-0 px-3 py-2"
      />
    </div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("priceLowToHigh");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedToyType, setSelectedToyType] = useState("");
  const searchInputRef = useRef(null);

  // Hook to fetch All products from Hygraph CMS
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    console.log("FetchActivities", fetchProducts);

    fetchProducts();
  }, []);

  // Sorting Options We provide
  const sortingOptions = [
    {
      id: "priceLowToHigh",
      label: "Price -- Low to High",
      value: "priceLowToHigh",
    },
    {
      id: "priceHighToLow",
      label: "Price -- High to Low",
      value: "priceHighToLow",
    },
    {
      id: "ratingHighToLow",
      label: "Rating -- High to Low",
      value: "ratingHighToLow",
    },
    {
      id: "ratingLowToHigh",
      label: "Ratings -- Low to High",
      value: "ratingLowToHigh",
    },
  ];

  // Sort products based on the selected option
  const sortProducts = (option) => {
    let sorted = [...products];
    switch (option) {
      case "priceLowToHigh":
        sorted.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "priceHighToLow":
        sorted.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case "ratingHighToLow":
        // Assuming products have a 'rating' field; if not, remove this case or add it.
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "ratingLowToHigh":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    setSortedProducts(sorted);
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSortOption(value);
    sortProducts(value);
  };

  // Function to handle Search Operation
  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );

    // Log the search term and filtered results
    console.log("Search Term:", term);
    console.log("Filtered Products:", filtered);

    setFilteredProducts(filtered);
  };

  // List of Skills Options Based Filters options
  const skillCategoryOptions = [
    "Sensory Development",
    "Mastering Feelings",
    "Listening & Talking",
    "Problem-solving & Independence",
    "Social Play",
    "Fine Motor",
    "GROSS MOTOR",
    "Pretend Play",
    "Crafts",
    "Exploring the Seasons",
    "Outdoors & Nature",
    "Rainy Day Play",
  ];

  // Effect to filter based on selected Skill category Option
  useEffect(() => {
    if (selectedCategory.length > 0) {
      const filtered = products.filter((product) =>
        product.keywords.some((keyword) => selectedCategory.includes(keyword))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Reset if no features are selected
    }
  }, [selectedCategory, products]);

  // Handle Skill Option filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      // Show all products if no category is selected
      setFilteredProducts(products);
    } else {
      // Filter products based on the selected category
      const filtered = products.filter((product) =>
        product.keywords.includes(category)
      );
      setFilteredProducts(filtered);
    }
  };

  // List of Material Options Based Filters options
  const materialOptions = ["Wood", "Plastic", "Fabric", "Metal", "Mixed"];

  // Effect to filter based on selected Material Option
  useEffect(() => {
    if (selectedMaterial.length > 0) {
      const filtered = products.filter((product) =>
        product.keywords.some((keyword) => selectedMaterial.includes(keyword))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Reset if no features are selected
    }
  }, [selectedMaterial, products]);

  // Handle SelectedMaterial Option filter change
  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    if (material === "") {
      // Show all products if no category is selected
      setFilteredProducts(products);
    } else {
      // Filter products based on the selected category
      const filtered = products.filter((product) =>
        product.keywords.includes(material)
      );
      setFilteredProducts(filtered);
    }
  };

  // List of ToyType Options Based Filters options
  const typeOfToyOptions = [
    "Educational",
    "Musical",
    "Puzzles",
    "Building Blocks",
    "Soft Toy",
  ];

  // Effect to filter based on selected ToyType Option
  useEffect(() => {
    if (selectedToyType.length > 0) {
      const filtered = products.filter((product) =>
        product.keywords.some((keyword) => selectedToyType.includes(keyword))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Reset if no features are selected
    }
  }, [selectedToyType, products]);

  // Handle SelectedToyType Option filter change
  const handleToyTypeChange = (toy) => {
    setSelectedToyType(toy);
    if (toy === "") {
      // Show all products if no category is selected
      setFilteredProducts(products);
    } else {
      // Filter products based on the selected category
      const filtered = products.filter((product) =>
        product.keywords.includes(toy)
      );
      setFilteredProducts(filtered);
    }
  };

  // // List of featuresOptions  Based Filters options
  const featuresOptions = [
    "Emotional & Social Strength",
    "Confidence & Independence",
    "Speech & Language",
    "Physical Agility",
    "Reading & Writing",
    "Discovering Our World",
    "Creativity & Imagination",
    "Experiments & Math",
  ];

  // Effect to filter based on selected ToyType Option
  useEffect(() => {
    if (selectedFeature.length > 0) {
      const filtered = products.filter((product) =>
        product.keywords.some((keyword) => selectedFeature.includes(keyword))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Reset if no features are selected
    }
  }, [selectedFeature, products]);

  // Handle SelectedToyType Option filter change
  const handlefeatureChange = (feature) => {
    setSelectedFeature(feature);
    if (feature === "") {
      // Show all products if no category is selected
      setFilteredProducts(products);
    } else {
      // Filter products based on the selected category
      const filtered = products.filter((product) =>
        product.keywords.includes(feature)
      );
      setFilteredProducts(filtered);
    }
  };

  // List of Discount  Based Filters options
  const disscountOptions = ["On Sale", "Clearance", "Bundle Offers"];

  // Effect to filter based on selected ToyType Option
  useEffect(() => {
    if (selectedDiscount.length > 0) {
      const filtered = products.filter((product) =>
        product.keywords.some((keyword) => selectedDiscount.includes(keyword))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Reset if no features are selected
    }
  }, [selectedDiscount, products]);

  // Handle SelectedToyType Option filter change
  const handlediscountChange = (discount) => {
    setSelectedDiscount(discount);
    if (discount === "") {
      // Show all products if no category is selected
      setFilteredProducts(products);
    } else {
      // Filter products based on the selected category
      const filtered = products.filter((product) =>
        product.keywords.includes(discount)
      );
      setFilteredProducts(filtered);
    }
  };

  const shouldShowAllProducts = !searchTerm || searchTerm.trim() === "";

  if (!products || products.length === 0) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }
  return (
    <>
      <Header className="sticky" />
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <Banner />
        <CardGroup />
        <div className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-2  flex flex-col md:flex-row gap-[20px]">
          <div className="claracontainer py-4 w-full bg-[#eaeaf5] flex flex-row overflow-hidden gap-8">
            {/* the product Grid Column */}
            <div className="flex w-full flex-col justift-start items-start gap-[20px] md:gap-[28px]">
              <div className="flex flex-col w-full gap-2">
                {/* Search Input Row */}
                <div className="flex w-full px-4 md:px-2">
                  <SearchInput
                    ref={searchInputRef}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                {/* Mobile Filters Button Row */}
                <div className="claracontainer px-4 md:px-2 lg:px-4 w-full flex flex-col lg:hidden overflow-hidden gap-2">
                  <div className="flex w-full justify-between items-center gap-1">
                    {/* sort */}
                    <Drawer className="w-full flex justify-center items-center">
                      <DrawerTrigger className="w-full">
                        <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
                          Sort
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="w-full justify-center overflow-clip h-[40vh] md:h-[40vh] items-center flex">
                        <DrawerHeader className="w-full h-full md:h-fit">
                          <DrawerDescription className="flex h-fit flex-col pt-2 pb-6 overflow-y-scroll justify-start items-start w-full gap-2">
                            <div className="text-red sticky underline text-2xl font-semibold text-center w-full font-fredoka capitalize leading-[28px]">
                              Sort By
                            </div>
                            <div className="flex flex-col gap-4 justify-start items-start">
                              {sortingOptions.map((option) => (
                                <div
                                  className="flex cursor-pointer items-center space-x-2"
                                  key={option.id}
                                >
                                  <input
                                    id={option.id}
                                    type="radio"
                                    name="sortOption"
                                    className={`${
                                      sortOption === option.value
                                        ? "border-red text-red"
                                        : "border-purple text-purple"
                                    }`}
                                    checked={sortOption === option.value}
                                    onChange={() =>
                                      handleSortChange(option.value)
                                    }
                                  />
                                  <label
                                    htmlFor={option.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
                          <DrawerClose className="flex w-full justify-between items-center gap-2">
                            <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                              Submit
                            </Button>
                            <Button className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                              Cancel
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                    {/* Filters */}
                    <Drawer className="w-full flex justify-center items-start">
                      <DrawerTrigger className="w-full">
                        <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
                          Filters
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="w-full justify-center max-h-[80vh] h-fit items-start overflow-y-scroll flex">
                        <DrawerHeader className="w-full h-fit flex flex-col justify-start overflow-y-scroll  items-start">
                          <DrawerDescription className="flex h-fit flex-col overflow-y-scroll justify-start items-start w-full gap-2">
                            <div className="text-red sticky underline  text-2xl font-semibold text-center w-full font-fredoka capitalize leading-[28px]">
                              Filters
                            </div>
                            <div className="flex flex-col gap-4 justify-start items-start">
                              {/* FIlters Based on Skill Category Options */}
                              <div className="flex flex-col justify-start items-start gap-2 w-full">
                                {/* <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]"> */}
                                <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
                                  Select Skill Options
                                </div>
                                {skillCategoryOptions.map((category) => (
                                  <label
                                    key={category}
                                    className={`block cursor-pointer text-sm font-medium font-fredoka leading-none `}
                                  >
                                    <input
                                      type="radio"
                                      name="skillCategory"
                                      value={category}
                                      checked={selectedCategory === category}
                                      onChange={() =>
                                        handleCategoryChange(category)
                                      }
                                      className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 `}
                                    />
                                    {category}
                                  </label>
                                ))}
                              </div>
                              {/* FIlters Based on Material Options */}
                              <div className="flex flex-col justify-start items-start gap-2 w-full">
                                <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
                                  Select Material Options
                                </div>
                                {materialOptions.map((material) => (
                                  <label
                                    key={material}
                                    className={`block cursor-pointer text-sm font-medium font-fredoka leading-none`}
                                  >
                                    <input
                                      type="radio"
                                      name="skillCategory"
                                      value={material}
                                      checked={selectedMaterial === material}
                                      onChange={() =>
                                        handleMaterialChange(material)
                                      }
                                      className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 `}
                                    />
                                    {material}
                                  </label>
                                ))}
                              </div>
                              {/* FIlters Based on ToyType Options */}
                              <div className="flex flex-col justify-start items-start gap-2 w-full">
                                <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
                                  Select Type of Toy
                                </div>
                                {typeOfToyOptions.map((toy) => (
                                  <label
                                    key={toy}
                                    className={`block cursor-pointer text-sm font-medium font-fredoka leading-none `}
                                  >
                                    <input
                                      type="radio"
                                      name="skillCategory"
                                      value={toy}
                                      checked={selectedToyType === toy}
                                      onChange={() => handleToyTypeChange(toy)}
                                      className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 `}
                                    />
                                    {toy}
                                  </label>
                                ))}
                              </div>
                              {/* FIlters Based on feature Options */}
                              <div className="flex flex-col justify-start items-start gap-2 w-full">
                                <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
                                  Select Educational Features
                                </div>
                                {featuresOptions.map((feature) => (
                                  <label
                                    key={feature}
                                    className={`block cursor-pointer text-sm font-medium font-fredoka leading-none`}
                                  >
                                    <input
                                      type="radio"
                                      name="skillCategory"
                                      value={feature}
                                      checked={selectedFeature === feature}
                                      onChange={() =>
                                        handlefeatureChange(feature)
                                      }
                                      className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 `}
                                    />
                                    {feature}
                                  </label>
                                ))}
                              </div>
                              {/* FIlters Based on Discounts Options */}
                              <div className="flex flex-col justify-start items-start gap-2 w-full">
                                <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
                                  Select Discount Type
                                </div>
                                {disscountOptions.map((discount) => (
                                  <label
                                    key={discount}
                                    className={`block cursor-pointer text-sm font-medium font-fredoka leading-none `}
                                  >
                                    <input
                                      type="radio"
                                      name="skillCategory"
                                      value={discount}
                                      checked={selectedDiscount === discount}
                                      onChange={() =>
                                        handlediscountChange(discount)
                                      }
                                      className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 `}
                                    />
                                    {discount}
                                  </label>
                                ))}
                              </div>
                            </div>
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
                          <DrawerClose className="flex w-full justify-between items-center gap-2">
                            <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                              Submit
                            </Button>
                            <Button className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                              Cancel
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </div>
              {/* Display Filtered Products First */}

              {(selectedCategory &&
                selectedMaterial &&
                selectedFeature &&
                selectedDiscount &&
                selectedToyType &&
                filteredProducts.length > 0) ||
                (!shouldShowAllProducts && (
                  <>
                    <div className="flex justify-between items-center lg:px-0 px-4 w-full">
                      <span className="w-[max-content] text-[#0A1932] font-fredoka tex-[24px] font-semibold">
                        Search Results
                      </span>
                    </div>
                    <div className="w-full lg:grid lg:grid-cols-3 px-4 md:px-2 lg:px-0 grid grid-cols-2 overflow-hidden gap-2">
                      {filteredProducts.map((product) => (
                        <div key={product.id} className="border">
                          <Link href={`/shop/${product.id}`}>
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
                ))}

              {/* Message if no matching products found */}
              {searchTerm && filteredProducts.length === 0 && (
                <div className="text-center clarabodyTwo text-red-500 ">
                  No matching products found. Here are some products you may
                  like:
                </div>
              )}
              {/* Display All Products Below */}

              <div className="flex flex-col justify-start items-start gap-2 md:gap-4 w-full">
                <div className="flex justify-between items-center px-4 lg:px-0 w-full">
                  <span className="w-[max-content] text-[#0A1932] font-fredoka tex-[24px] font-semibold">
                    All Products
                  </span>
                </div>
                <div className="w-full lg:grid lg:grid-cols-3 px-4 md:px-2 lg:px-0 grid grid-cols-2 overflow-hidden gap-2">
                  {/* {sortedProducts.map((product) => ( */}
                  {products.map((product) => (
                    <div key={product.id} className="border">
                      <Link href={`/shop/${product.id}`}>
                        <MobileProductCard
                          image={product.thumbnail.url || ProductImage}
                          title={product.title}
                          price={product.salePrice}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NewsLetter />
      <BottomNavigation />
    </>
  );
}
