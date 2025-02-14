"use client";

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
import { Banner, BottomNavigation, Header, MobileProducts, NewsLetter } from "../Sections";
import { cardGroupData } from "../constant/standard";

import { useEffect, useState } from "react";
import Image from "next/image";
import FilterSection, {
  Checkbox,
  ProductsWithPagination,
  RadioGroup,
} from "../Sections/Shop/AdvanceFIlters";
import { fetchShopProducts } from "../data/p/Dynamic/Shop";
import SearchInput from "../Sections/Shop/SearchInput";
import { LocalProductCard } from "../Sections/Mobile/MobileProducts";

export default function ShopPage() {
  const [products, setProducts] = useState([]); // State to hold the products
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track errors
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order
  const [showInStockOnly, setShowInStockOnly] = useState(false); // State to track in-stock filter
  const [selectedMaterialOption, setSelectedMaterialOption] = useState(""); // State for selected material option filter
  const [selectedSkillOption, setSelectedSkillOption] = useState(""); // State for selected skill option filter
  const [selectedTypeOfToy, setSelectedTypeOfToy] = useState(""); // State for selected TypeOfToy filter
  const [selectedKeyword, setSelectedKeyword] = useState(""); // State for selected Keyword filter
  const [selectedDiscountType, setSelectedDiscountType] = useState(""); // State for selected DiscountType filter
  const [selectedEducationalFeature, setSelectedEducationalFeature] =
    useState(""); // State for selected EducationalFeatures filter
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const itemsPerPage = 18; // Number of items per page

  // Fetch products when component mounts
  useEffect(() => {
    async function getProducts() {
      const fetchedProducts = await fetchShopProducts();
      if (!Array.isArray(fetchedProducts)) {
        setError("Invalid data format: Products data is not an array.");
      } else if (fetchedProducts.length === 0) {
        setError("No products available.");
      } else {
        setProducts(fetchedProducts);
      }
      setLoading(false);
    }

    getProducts(); // Fetch the products when the component mounts
  }, []);

  // Extract unique skill options, material options, type of toy, and educational, discountTypeOptions,  features from products
  const skillOptions = [
    ...new Set(products.map((product) => product.SkillOptions)),
  ];
  const materialOptions = [
    ...new Set(products.map((product) => product.MaterialOptions)),
  ];
  const typeOfToyOptions = [
    ...new Set(products.map((product) => product.TypeOfToy)),
  ];
  const educationalFeaturesOptions = [
    ...new Set(products.map((product) => product.EducationalFeatures)),
  ];
  const discountTypeOptions = [
    ...new Set(products.map((product) => product.DiscountType)),
  ];
  const keywordOptions = [
    ...new Set(products.flatMap((product) => product.Keywords || [])),
  ];

  // Sort products based on price and selected sort order
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.DiscountPrice || a.Price;
    const priceB = b.DiscountPrice || b.Price;

    if (sortOrder === "asc") {
      return priceA - priceB; // Ascending order
    } else {
      return priceB - priceA; // Descending order
    }
  });

  // Filter products based on in-stock status, selected skill option, material option, matchesDiscountType, type of toy, and educational features
  const filteredProducts = sortedProducts.filter((product) => {
    const matchesStock = showInStockOnly ? product.inStock : true;
    const matchesSkillOption = selectedSkillOption
      ? product.SkillOptions === selectedSkillOption
      : true;
    const matchesMaterialOption = selectedMaterialOption
      ? product.MaterialOptions === selectedMaterialOption
      : true;
    const matchesTypeOfToy = selectedTypeOfToy
      ? product.TypeOfToy === selectedTypeOfToy
      : true;
    const matchesEducationalFeature = selectedEducationalFeature
      ? product.EducationalFeatures === selectedEducationalFeature
      : true;
    const matchesDiscountType = selectedDiscountType
      ? product.DiscountType === selectedDiscountType
      : true;
    const matchesKeyword = selectedKeyword
      ? product.Keywords && product.Keywords.includes(selectedKeyword)
      : true;

    // Match the search term with product name or description
    const matchesSearch =
      product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.Description &&
        product.Description.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      matchesStock &&
      matchesSkillOption &&
      matchesMaterialOption &&
      matchesTypeOfToy &&
      matchesEducationalFeature &&
      matchesDiscountType &&
      matchesKeyword &&
      matchesSearch
    );
  });
  // Paginate products based on current page and items per page
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Function to change page
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to reset all filters
  const resetFilters = () => {
    setSortOrder("asc");
    setShowInStockOnly(false);
    setSelectedSkillOption("");
    setSelectedMaterialOption("");
    setSelectedTypeOfToy("");
    setSelectedEducationalFeature("");
    setSelectedDiscountType("");
    setSelectedKeyword("");
    setSearchTerm(""); // Reset search term
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header className="sticky" />
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <div className="flex flex-col w-full justify-center items-center">
          <Banner />
          <div className="flex pl-4 lg:px-0 claracontainer lg:hover:pl-4 duration-300 ease-ease-in-out scrollbar-hidden bg-[#eaeaf5] scrollbar-none py-2 overflow-x-scroll overflow-y-hidden gap-2 pr-4 md:gap-3 lg:gap-4">
            {keywordOptions.map((keyword, index) => (
              <div key={index} className="keyword-card">
                {cardGroupData
                  .filter((item) =>
                    item.title.toLowerCase().includes(keyword.toLowerCase())
                  )
                  .map((filteredItem, index) => (
                    <div
                      key={index}
                      className="md:w-[120px] w-[100px] h-[120px] md:h-[149px] cursor-pointer hover:scale-105 duration-150 pl-[6.13px] pr-[6.12px] pt-[12.25px] pb-[21.25px] rounded-xl flex-col justify-start items-center gap-2 inline-flex"
                      style={{ backgroundColor: filteredItem.bgColor }}
                    >
                      <div className="w-[74px] h-[74px] relative gap-2 lg:gap-0 flex-col justify-center items-center flex">
                        <Image
                          width={73.5}
                          height={73.5}
                          className="absolute w-[60px] h-[60px] lg:w-full lg:h-full"
                          src={filteredItem.icon}
                          alt={filteredItem.title}
                        />
                      </div>
                      <h3 className="w-[110px] text-center text-white text-[13px] font-semibold font-fredoka leading-none">
                        {filteredItem.title}
                      </h3>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-2 flex flex-col md:flex-row gap-[20px]">
          <div className="claracontainer py-4 w-full bg-[#eaeaf5] flex flex-row overflow-hidden gap-8">
            {/* Filters Sidebar */}
            <div className="md:hidden lg:flex h-fit xl:flex hidden sticky top-0 max-w-[26%] flex-col px-4 py-6 gap-4 w-full items-start justify-start bg-[#ffffff] rounded-[24px] z-10">
              <div className="text-red text-[32px] font-semibold font-fredoka leading-[25px] tracking-wide">
                Filters
              </div>
              <div className="claracontainer flex flex-col justify-start items-start gap-6 w-full">
                {/* Sort by Price */}
                <div className="claracontainer flex flex-col justify-start items-start gap-2 w-full">
                  <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
                    Sort product by Price
                  </div>
                  <div className="flex flex-col gap-4 justify-start items-start">
                    <label className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <input
                        type="radio"
                        value="asc"
                        checked={sortOrder === "asc"}
                        onChange={() => setSortOrder("asc")}
                        className="mr-2"
                      />
                      Low to High
                    </label>
                    <label className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <input
                        type="radio"
                        value="desc"
                        checked={sortOrder === "desc"}
                        onChange={() => setSortOrder("desc")}
                        className="mr-2"
                      />
                      High to Low
                    </label>
                  </div>
                </div>

                {/* In-stock filter checkbox */}
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                  <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]">
                    Show In-stock
                  </div>
                  <div className="w-full flex">
                    <label className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <input
                        type="checkbox"
                        checked={showInStockOnly}
                        onChange={() => setShowInStockOnly(!showInStockOnly)}
                        className="mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      />
                      Show Only In-Stock Products
                    </label>
                  </div>
                </div>

                {/* Filters for Skill, Material, Type, Features, Discount */}
                <FilterSection
                  title="Select Skill Options"
                  options={skillOptions}
                  selectedValue={selectedSkillOption}
                  setSelectedValue={setSelectedSkillOption}
                  name="skillOption"
                />
                <FilterSection
                  title="Select Material Options"
                  options={materialOptions}
                  selectedValue={selectedMaterialOption}
                  setSelectedValue={setSelectedMaterialOption}
                  name="materialOption"
                />
                <FilterSection
                  title="Select Type of Toy"
                  options={typeOfToyOptions}
                  selectedValue={selectedTypeOfToy}
                  setSelectedValue={setSelectedTypeOfToy}
                  name="typeOfToy"
                />
                <FilterSection
                  title="Select Educational Features"
                  options={educationalFeaturesOptions}
                  selectedValue={selectedEducationalFeature}
                  setSelectedValue={setSelectedEducationalFeature}
                  name="educationalFeature"
                />
                <FilterSection
                  title="Select Discount Type"
                  options={discountTypeOptions}
                  selectedValue={selectedDiscountType}
                  setSelectedValue={setSelectedDiscountType}
                  name="discountType"
                />
                <FilterSection
                  title="Select Keyword Type"
                  options={keywordOptions}
                  selectedValue={selectedKeyword}
                  setSelectedValue={setSelectedKeyword}
                  name="keywordType"
                />

                {/* Reset Filters Button */}
                <div className="w-full flex justify-center mb-4">
                  <Button
                    onClick={resetFilters}
                    className="bg-transparent hover:bg-gray-100 text-red font-fredoka py-2 text-[16px] font-medium px-4 rounded-lg"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Products Grid */}
            <div className="flex w-full flex-col justify-start items-center gap-2">
              <div className="flex flex-col w-full gap-2">
                {/* Search Bar */}
                <div className="flex w-full px-4 lg:px-0">
                  <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Mobile Filters Button Row */}
                <div className="claracontainer px-4 md:px-2 lg:px-4 w-full flex flex-col lg:hidden overflow-hidden gap-2">
                  <div className="flex w-full justify-between items-center gap-1">
                    {/* Sort */}
                    <Drawer className="w-full flex justify-center items-center">
                      <DrawerTrigger className="w-full">
                        <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
                          Sort
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="w-full justify-center overflow-clip h-[40vh] md:h-[40vh] items-center flex">
                        <DrawerHeader className="w-full h-full md:h-fit">
                          <DrawerDescription className="flex h-fit flex-col py-6 overflow-y-scroll justify-start items-start w-full gap-2">
                            <div className="text-red sticky underline text-2xl font-semibold text-center w-full font-fredoka capitalize leading-[28px]">
                              Sort By
                            </div>
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <RadioGroup
                                label="Sort Order"
                                options={["Low to High", "High to Low"]}
                                selectedValue={sortOrder}
                                onChange={setSortOrder}
                              />
                            </div>
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="shadow-upper w-full h-fit rounded-t-[12px]">
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
                        <DrawerHeader className="w-full h-fit flex flex-col justify-start overflow-y-scroll items-start">
                          <DrawerDescription className="flex h-fit flex-col overflow-y-scroll justify-start items-start w-full gap-2">
                            <div className="text-red sticky underline text-2xl font-semibold text-center w-full font-fredoka capitalize leading-[28px]">
                              Filters
                            </div>
                            <div className="flex flex-col gap-4 justify-start items-start">
                              {/* In-stock filter */}
                              <Checkbox
                                label="Show Only In-Stock Products"
                                checked={showInStockOnly}
                                onChange={() =>
                                  setShowInStockOnly(!showInStockOnly)
                                }
                              />
                              {/* Skill Options filter */}
                              <RadioGroup
                                label="Select Skill Options"
                                options={skillOptions}
                                selectedValue={selectedSkillOption}
                                onChange={setSelectedSkillOption}
                              />
                              {/* Material Options filter */}
                              <RadioGroup
                                label="Select Material Options"
                                options={materialOptions}
                                selectedValue={selectedMaterialOption}
                                onChange={setSelectedMaterialOption}
                              />
                              {/* Type of Toy filter */}
                              <RadioGroup
                                label="Select Type of Toy"
                                options={typeOfToyOptions}
                                selectedValue={selectedTypeOfToy}
                                onChange={setSelectedTypeOfToy}
                              />
                              {/* Educational Features filter */}
                              <RadioGroup
                                label="Select Educational Features"
                                options={educationalFeaturesOptions}
                                selectedValue={selectedEducationalFeature}
                                onChange={setSelectedEducationalFeature}
                              />
                              {/* Discount Type filter */}
                              <RadioGroup
                                label="Select Discount Type"
                                options={discountTypeOptions}
                                selectedValue={selectedDiscountType}
                                onChange={setSelectedDiscountType}
                              />
                            </div>
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="shadow-upper w-full h-full justify-between flex md:h-fit gap-2 rounded-t-[12px]">
                          <DrawerClose className="flex w-full justify-between items-center gap-2">
                            <Button
                              onClick={resetFilters}
                              className="bg-transparent w-full hover:bg-gray-100 text-red font-fredoka py-2 text-[16px] font-medium px-4 rounded-lg"
                            >
                              Reset Filters
                            </Button>
                            <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
                              Submit
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </div>

              {/* Display Filtered Products First */}
              <div className="w-full md:px-2 lg:px-0 grid grid-cols-2 px-4 flex-col  gap-2">
                {/* Product Dom, all filters/sorted products will be shown here */}
                {paginatedProducts.map((product) => {
                  return (
                    <div key={product.documentId} className="product-card">
                      <LocalProductCard 
                        productUrl={`/shop/${product.documentId}`}
                        image={
                          product?.FeaturedImage
                            ? `https://lionfish-app-98urn.ondigitalocean.app${product?.FeaturedImage?.[0]?.url}`
                            : "/Images/BlogThumb.png"
                        }
                        // image={
                        //   product?.FeaturedImage?.[0]?.url ||
                        //   "/Images/BlogThumb.png"
                        // }
                        price={
                          product.DiscountPrice ||
                          product.Price ||
                          "Price not available"
                        }
                        title={product.Name || "Untitled Product"}
                      />
                    </div>
                  );
                })}
              </div>
             
              {/* Pagination Controls */}
              <div className="w-full hidden lg:flex justify-between items-center mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-transparent text-red py-2 px-4 rounded-lg mr-2"
                >
                  Previous
                </button>
                <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-transparent text-red py-2 px-4 rounded-lg ml-2"
                >
                  Next
                </button>
              </div>

              {/* All Products */}
              <ProductsWithPagination products={products} />
            </div>
          </div>
        </div>
      </section>
      <NewsLetter />
      <BottomNavigation />
    </>
  );
}



// export function LocalMobileProducts({ image, title, price }) {
//   const [rating, setRating] = useState(0);
//   useEffect(() => {
//     // Function to generate a random number between 3 and 4.8, rounded to 1 decimal place
//     const generateRandomRating = () => {
//       const min = 3;
//       const max = 4.8;
//       const randomRating = (Math.random() * (max - min) + min).toFixed(1);
//       return randomRating;
//     };

//     setRating(generateRandomRating());
//   }, []);

//   return (
//     <div className="flex lg:max-w-[300px] min-w-[170px] max-w-full lg:min-w-[240px] w-full flex-col rounded-[12px] items-center gap-2 lg:gap-4 bg-white hover:shadow-md">
//       <div className="flex rounded-t-[12px] overflow-clip w-full">
//         <Image
//           src={image}
//           alt={title}
//           width={200}
//           height={200}
//           className="w-full hover:scale-110 duration-300 h-[160px] md:h-[220px] rounded-t-[12px] object-cover"
//         />
//       </div>
//       <div className="claracontainer flex flex-col justify-start min-h-[100px] items-start  w-full gap-2">
//         <div className="flex items-center px-2 w-full justify-between gap-2">
//           <h1 className="flex text-[24px] leading-tight font-semibold text-[#0A1932] font-fredoka">
//             $ {price || "29"}
//           </h1>
//           <div className="flex flex-row justify-center gap-[2px] items-center">
//             <Image
//               alt="Kindi"
//               src={Ratings}
//               className="text-yellow-400 w-4 h-4"
//             />
//             <span className="text-right text-[#0a1932] clarabodyTwo">
//               {rating}+
//             </span>
//           </div>
//         </div>
//         <h3 className="text-start text-[#0a1932] clarabodyTwo font-medium w-full px-2 pb-4">
//           {title.length > 30 ? `${title.slice(0, 24)}...` : title}
//         </h3>
//       </div>
//     </div>
//   );
// }

// export function ShopPag2e() {
//   const [products, setProducts] = useState([]);
//   const [sortOption, setSortOption] = useState("priceLowToHigh");
//   const [sortedProducts, setSortedProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedMaterial, setSelectedMaterial] = useState("");
//   const [selectedFeature, setSelectedFeature] = useState("");
//   const [selectedDiscount, setSelectedDiscount] = useState("");
//   const [selectedToyType, setSelectedToyType] = useState("");
//   const [selectedCardGroupProducts, setSelectedCardGroupProducts] =
//     useState("");
//   const searchInputRef = useRef(null);

//   // FIlters for Card Group
//   useEffect(() => {
//     if (selectedCardGroupProducts.length > 0) {
//       const filtered = products.filter((product) =>
//         product.keywords.some((keyword) =>
//           selectedCardGroupProducts.includes(keyword)
//         )
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts([]); // Reset if no features are selected
//     }
//   }, [selectedCardGroupProducts, products]);

//   const handleCardGroupProductsChange = (category) => {
//     setSelectedCardGroupProducts(category);
//     if (category === "") {
//       // Show all products if no category is selected
//       setFilteredProducts(products);
//     } else {
//       // Filter products based on the selected category
//       const filtered = products.filter((product) =>
//         product.keywords.includes(category)
//       );
//       setFilteredProducts(filtered);
//     }
//   };
//   // Hook to fetch All products from Hygraph CMS
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const data = await getProducts();
//       setProducts(data);
//       setFilteredProducts(data);
//     };
//     console.log("FetchActivities", fetchProducts);

//     fetchProducts();
//   }, []);

//   // Sorting Options We provide
//   const sortingOptions = [
//     {
//       id: "priceLowToHigh",
//       label: "Price -- Low to High",
//       value: "priceLowToHigh",
//     },
//     {
//       id: "priceHighToLow",
//       label: "Price -- High to Low",
//       value: "priceHighToLow",
//     },
//     {
//       id: "ratingHighToLow",
//       label: "Rating -- High to Low",
//       value: "ratingHighToLow",
//     },
//     {
//       id: "ratingLowToHigh",
//       label: "Ratings -- Low to High",
//       value: "ratingLowToHigh",
//     },
//   ];

//   // Sort products based on the selected option
//   const sortProducts = (option) => {
//     let sorted = [...products];
//     switch (option) {
//       case "priceLowToHigh":
//         sorted.sort((a, b) => a.salePrice - b.salePrice);
//         break;
//       case "priceHighToLow":
//         sorted.sort((a, b) => b.salePrice - a.salePrice);
//         break;
//       case "ratingHighToLow":
//         // Assuming products have a 'rating' field; if not, remove this case or add it.
//         sorted.sort((a, b) => b.rating - a.rating);
//         break;
//       case "ratingLowToHigh":
//         sorted.sort((a, b) => a.rating - b.rating);
//         break;
//       default:
//         break;
//     }
//     setSortedProducts(sorted);
//   };

//   // Handle sort change
//   const handleSortChange = (value) => {
//     setSortOption(value);
//     sortProducts(value);
//   };

//   // Function to handle Search Operation
//   const handleSearchChange = (event) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTerm(term);

//     const filtered = products.filter((product) =>
//       product.title.toLowerCase().includes(term)
//     );

//     // Log the search term and filtered results
//     console.log("Search Term:", term);
//     console.log("Filtered Products:", filtered);

//     setFilteredProducts(filtered);
//   };

//   // List of Skills Options Based Filters options
//   const skillCategoryOptions = [
//     "Sensory Development",
//     "Mastering Feelings",
//     "Listening & Talking",
//     "Problem-solving & Independence",
//     "Social Play",
//     "Fine Motor",
//     "GROSS MOTOR",
//     "Pretend Play",
//     "Crafts",
//     "Exploring the Seasons",
//     "Outdoors & Nature",
//     "Rainy Day Play",
//   ];

//   // Effect to filter based on selected Skill category Option
//   useEffect(() => {
//     if (selectedCategory.length > 0) {
//       const filtered = products.filter((product) =>
//         product.keywords.some((keyword) => selectedCategory.includes(keyword))
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts([]); // Reset if no features are selected
//     }
//   }, [selectedCategory, products]);

//   // Handle Skill Option filter change
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     if (category === "") {
//       // Show all products if no category is selected
//       setFilteredProducts(products);
//     } else {
//       // Filter products based on the selected category
//       const filtered = products.filter((product) =>
//         product.keywords.includes(category)
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   // List of Material Options Based Filters options
//   const materialOptions = ["Wood", "Plastic", "Fabric", "Metal", "Mixed"];

//   // Effect to filter based on selected Material Option
//   useEffect(() => {
//     if (selectedMaterial.length > 0) {
//       const filtered = products.filter((product) =>
//         product.keywords.some((keyword) => selectedMaterial.includes(keyword))
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts([]); // Reset if no features are selected
//     }
//   }, [selectedMaterial, products]);

//   // Handle SelectedMaterial Option filter change
//   const handleMaterialChange = (material) => {
//     setSelectedMaterial(material);
//     if (material === "") {
//       // Show all products if no category is selected
//       setFilteredProducts(products);
//     } else {
//       // Filter products based on the selected category
//       const filtered = products.filter((product) =>
//         product.keywords.includes(material)
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   // List of ToyType Options Based Filters options
//   const typeOfToyOptions = [
//     "Educational",
//     "Musical",
//     "Puzzles",
//     "Building Blocks",
//     "Soft Toy",
//   ];

//   // Effect to filter based on selected ToyType Option
//   useEffect(() => {
//     if (selectedToyType.length > 0) {
//       const filtered = products.filter((product) =>
//         product.keywords.some((keyword) => selectedToyType.includes(keyword))
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts([]); // Reset if no features are selected
//     }
//   }, [selectedToyType, products]);

//   // Handle SelectedToyType Option filter change
//   const handleToyTypeChange = (toy) => {
//     setSelectedToyType(toy);
//     if (toy === "") {
//       // Show all products if no category is selected
//       setFilteredProducts(products);
//     } else {
//       // Filter products based on the selected category
//       const filtered = products.filter((product) =>
//         product.keywords.includes(toy)
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   // // List of featuresOptions  Based Filters options
//   const featuresOptions = [
//     "Emotional & Social Strength",
//     "Confidence & Independence",
//     "Speech & Language",
//     "Physical Agility",
//     "Reading & Writing",
//     "Discovering Our World",
//     "Creativity & Imagination",
//     "Experiments & Math",
//   ];

//   // Effect to filter based on selected ToyType Option
//   useEffect(() => {
//     if (selectedFeature.length > 0) {
//       const filtered = products.filter((product) =>
//         product.keywords.some((keyword) => selectedFeature.includes(keyword))
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts([]); // Reset if no features are selected
//     }
//   }, [selectedFeature, products]);

//   // Handle SelectedToyType Option filter change
//   const handlefeatureChange = (feature) => {
//     setSelectedFeature(feature);
//     if (feature === "") {
//       // Show all products if no category is selected
//       setFilteredProducts(products);
//     } else {
//       // Filter products based on the selected category
//       const filtered = products.filter((product) =>
//         product.keywords.includes(feature)
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   // List of Discount  Based Filters options
//   const disscountOptions = ["On Sale", "Clearance", "Bundle Offers"];

//   // Effect to filter based on selected ToyType Option
//   useEffect(() => {
//     if (selectedDiscount.length > 0) {
//       const filtered = products.filter((product) =>
//         product.keywords.some((keyword) => selectedDiscount.includes(keyword))
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts([]); // Reset if no features are selected
//     }
//   }, [selectedDiscount, products]);

//   // Handle SelectedToyType Option filter change
//   const handlediscountChange = (discount) => {
//     setSelectedDiscount(discount);
//     if (discount === "") {
//       // Show all products if no category is selected
//       setFilteredProducts(products);
//     } else {
//       // Filter products based on the selected category
//       const filtered = products.filter((product) =>
//         product.keywords.includes(discount)
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   const shouldShowAllProducts = !searchTerm || searchTerm.trim() === "";

//   if (!products || products.length === 0) {
//     return (
//       <div>
//         <NotFound />
//       </div>
//     );
//   }
//   return (
//     <>
//       <NewHeader headerText="Shop" />

//       <section className="w-full pb-32 z-50  -mt-[8px] rounded-t-[16px] bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
//         <div className="flex w-full justify-center items-center">
//           <Banner />
//         </div>
//         {/* <CardGroup /> */}
//         <section className="w-full h-auto bg-[#EAEAF5] pl-4 items-center justify-center flex flex-col md:flex-row gap-[20px]">
//           <div className="flex claracontainer lg:hover:pl-4 duration-300 ease-ease-in-out scrollbar-hidden bg-[#eaeaf5] scrollbar-none py-2 overflow-x-scroll overflow-y-hidden gap-2 pr-4 md:gap-3 lg:gap-4">
//             {cardGroupData.map((data, index) => (
//               <div
//                 key={index}
//                 className={`w-[100px] ${
//                   selectedCardGroupProducts === data.title
//                     ? "bg-opacity-80 border-4 border-white"
//                     : ""
//                 } md:w-[120px] h-[120px] md:h-[149px] cursor-pointer hover:scale-105 duration-150 pl-[6.13px] pr-[6.12px] pt-[12.25px] pb-[21.25px] rounded-xl flex-col justify-start items-center gap-2 inline-flex`}
//                 style={{ backgroundColor: data.bgColor }}
//                 onClick={() => handleCardGroupProductsChange(data.title)} // Passing category title
//               >
//                 <div className="w-[74px] h-[74px] relative gap-2 lg:gap-0 flex-col justify-center items-center flex">
//                   <Image
//                     width={73.5}
//                     height={73.5}
//                     className="absolute w-[60px] h-[60px] lg:w-full lg:h-full"
//                     src={data.icon}
//                     alt={data.title}
//                   />
//                 </div>
//                 <div className="w-[110px] text-center text-white text-[13px] font-semibold font-fredoka leading-none">
//                   {data.title}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//         <div className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-2  flex flex-col md:flex-row gap-[20px]">
//           <div className="claracontainer py-4 w-full bg-[#eaeaf5] flex flex-row overflow-hidden gap-8">
//             {/* the product Grid Column */}
//             <div className="flex w-full flex-col justift-start items-start gap-[20px] md:gap-[28px]">
//               <div className="flex flex-col w-full gap-2">
//                 {/* Search Input Row */}
//                 <div className="flex w-full px-4 md:px-2">
//                   <SearchInput
//                     // ref={searchInputRef}
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                   />
//                 </div>
//                 {/* Mobile Filters Button Row */}
//                 <div className="claracontainer px-4 md:px-2 lg:px-4 w-full flex flex-col lg:hidden overflow-hidden gap-2">
//                   <div className="flex w-full justify-between items-center gap-1">
//                     {/* sort */}
//                     <Drawer className="w-full flex justify-center items-center">
//                       <DrawerTrigger className="w-full">
//                         <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
//                           Sort
//                         </Button>
//                       </DrawerTrigger>
//                       <DrawerContent className=" w-full justify-center overflow-clip h-[40vh] md:h-[40vh] items-center flex">
//                         <DrawerHeader className="w-full h-full md:h-fit">
//                           <DrawerDescription className="flex h-fit flex-col py-6 overflow-y-scroll justify-start items-start w-full gap-2">
//                             <div className="text-red sticky underline  text-2xl font-semibold text-center w-full font-fredoka capitalize leading-[28px]">
//                               Sort By
//                             </div>
//                             <div className="flex flex-col gap-4 justify-start items-start">
//                               {sortingOptions.map((option) => (
//                                 <div
//                                   className="flex cursor-pointer items-center space-x-2"
//                                   key={option.id}
//                                 >
//                                   <input
//                                     id={option.id}
//                                     type="radio"
//                                     name="sortOption"
//                                     className={`${
//                                       sortOption === option.value
//                                         ? "border-red text-red"
//                                         : "border-purple text-purple"
//                                     }`}
//                                     checked={sortOption === option.value}
//                                     onChange={() =>
//                                       handleSortChange(option.value)
//                                     }
//                                   />
//                                   <label
//                                     htmlFor={option.id}
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                   >
//                                     {option.label}
//                                   </label>
//                                 </div>
//                               ))}
//                             </div>
//                           </DrawerDescription>
//                         </DrawerHeader>
//                         <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
//                           <DrawerClose className="flex w-full justify-between items-center gap-2">
//                             <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
//                               Submit
//                             </Button>
//                             <Button className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
//                               Cancel
//                             </Button>
//                           </DrawerClose>
//                         </DrawerFooter>
//                       </DrawerContent>
//                     </Drawer>
//                     {/* Filters */}
//                     <Drawer className="w-full flex justify-center items-start">
//                       <DrawerTrigger className="w-full">
//                         <Button className="bg-[#f8f8f8] w-full hover:bg-white rounded-[100px] border-2 border-red flex-col justify-center items-center gap-2 inline-flex text-red text-sm font-medium font-fredoka leading-tight">
//                           Filters
//                         </Button>
//                       </DrawerTrigger>
//                       <DrawerContent className="w-full justify-center max-h-[80vh] h-fit items-start overflow-y-scroll flex">
//                         <DrawerHeader className="w-full h-fit flex flex-col justify-start overflow-y-scroll  items-start">
//                           <DrawerDescription className="flex h-fit flex-col overflow-y-scroll justify-start items-start w-full gap-2">
//                             <div className="text-red sticky underline  text-2xl font-semibold text-center w-full font-fredoka capitalize leading-[28px]">
//                               Filters
//                             </div>
//                             <div className="flex flex-col gap-4 justify-start items-start">
//                               {/* FIlters Based on Skill Category Options */}
//                               <div className="flex flex-col justify-start items-start gap-2 w-full">
//                                 {/* <div className="text-[#252c32] text-xl font-semibold font-fredoka leading-[25px]"> */}
//                                 <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
//                                   Select Skill Options
//                                 </div>
//                                 {skillCategoryOptions.map((category) => (
//                                   <label
//                                     key={category}
//                                     className={`block cursor-pointer text-sm font-medium font-fredoka leading-none ${
//                                       selectedCategory === category
//                                         ? "text-red"
//                                         : "text-[#252c32]"
//                                     }`}
//                                   >
//                                     <input
//                                       type="radio"
//                                       name="skillCategory"
//                                       value={category}
//                                       checked={selectedCategory === category}
//                                       onChange={() =>
//                                         handleCategoryChange(category)
//                                       }
//                                       className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
//                                         selectedCategory === category
//                                           ? "border-purple text-red"
//                                           : "border-purple"
//                                       }`}
//                                     />
//                                     {category}
//                                   </label>
//                                 ))}
//                               </div>
//                               {/* FIlters Based on Material Options */}
//                               <div className="flex flex-col justify-start items-start gap-2 w-full">
//                                 <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
//                                   Select Material Options
//                                 </div>
//                                 {materialOptions.map((material) => (
//                                   <label
//                                     key={material}
//                                     className={`block cursor-pointer text-sm font-medium font-fredoka leading-none ${
//                                       selectedMaterial === material
//                                         ? "text-red"
//                                         : "text-[#252c32]"
//                                     }`}
//                                   >
//                                     <input
//                                       type="radio"
//                                       name="skillCategory"
//                                       value={material}
//                                       checked={selectedMaterial === material}
//                                       onChange={() =>
//                                         handleMaterialChange(material)
//                                       }
//                                       className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
//                                         selectedMaterial === material
//                                           ? "border-purple text-red"
//                                           : "border-purple"
//                                       }`}
//                                     />
//                                     {material}
//                                   </label>
//                                 ))}
//                               </div>
//                               {/* FIlters Based on ToyType Options */}
//                               <div className="flex flex-col justify-start items-start gap-2 w-full">
//                                 <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
//                                   Select Type of Toy
//                                 </div>
//                                 {typeOfToyOptions.map((toy) => (
//                                   <label
//                                     key={toy}
//                                     className={`block cursor-pointer text-sm font-medium font-fredoka leading-none ${
//                                       selectedToyType === toy
//                                         ? "text-red"
//                                         : "text-[#252c32]"
//                                     }`}
//                                   >
//                                     <input
//                                       type="radio"
//                                       name="skillCategory"
//                                       value={toy}
//                                       checked={selectedToyType === toy}
//                                       onChange={() => handleToyTypeChange(toy)}
//                                       className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
//                                         selectedToyType === toy
//                                           ? "border-purple text-red"
//                                           : "border-purple"
//                                       }`}
//                                     />
//                                     {toy}
//                                   </label>
//                                 ))}
//                               </div>
//                               {/* FIlters Based on feature Options */}
//                               <div className="flex flex-col justify-start items-start gap-2 w-full">
//                                 <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
//                                   Select Educational Features
//                                 </div>
//                                 {featuresOptions.map((feature) => (
//                                   <label
//                                     key={feature}
//                                     className={`block cursor-pointer text-sm font-medium font-fredoka leading-none ${
//                                       selectedFeature === feature
//                                         ? "text-red"
//                                         : "text-[#252c32]"
//                                     }`}
//                                   >
//                                     <input
//                                       type="radio"
//                                       name="skillCategory"
//                                       value={feature}
//                                       checked={selectedFeature === feature}
//                                       onChange={() =>
//                                         handlefeatureChange(feature)
//                                       }
//                                       className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
//                                         selectedFeature === feature
//                                           ? "border-purple text-red"
//                                           : "border-purple"
//                                       }`}
//                                     />
//                                     {feature}
//                                   </label>
//                                 ))}
//                               </div>
//                               {/* FIlters Based on Discounts Options */}
//                               <div className="flex flex-col justify-start items-start gap-2 w-full">
//                                 <div className="text-[#252c32] font-bold text-[20px] font-fredoka">
//                                   Select Discount Type
//                                 </div>
//                                 {disscountOptions.map((discount) => (
//                                   <label
//                                     key={discount}
//                                     className={`block cursor-pointer text-sm font-medium font-fredoka leading-none ${
//                                       selectedDiscount === discount
//                                         ? "text-red"
//                                         : "text-[#252c32]"
//                                     }`}
//                                   >
//                                     <input
//                                       type="radio"
//                                       name="skillCategory"
//                                       value={discount}
//                                       checked={selectedDiscount === discount}
//                                       onChange={() =>
//                                         handlediscountChange(discount)
//                                       }
//                                       className={`mr-2 text-sm text-red font-medium font-fredoka leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
//                                         selectedDiscount === discount
//                                           ? "border-purple text-red"
//                                           : "border-purple"
//                                       }`}
//                                     />
//                                     {discount}
//                                   </label>
//                                 ))}
//                               </div>
//                             </div>
//                           </DrawerDescription>
//                         </DrawerHeader>
//                         <DrawerFooter className="shadow-upper w-full h-full md:h-fit rounded-t-[12px]">
//                           <DrawerClose className="flex w-full justify-between items-center gap-2">
//                             <Button className="bg-[#3f3a64] w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
//                               Submit
//                             </Button>
//                             <Button className="bg-red w-full rounded-2xl shadow border-2 border-white text-center text-white text-xs font-semibold font-fredoka leading-none">
//                               Cancel
//                             </Button>
//                           </DrawerClose>
//                         </DrawerFooter>
//                       </DrawerContent>
//                     </Drawer>
//                   </div>
//                 </div>
//               </div>
//               {/* Display Filtered Products First */}

//               {(selectedCategory &&
//                 selectedMaterial &&
//                 selectedFeature &&
//                 selectedDiscount &&
//                 selectedToyType &&
//                 filteredProducts.length > 0) ||
//                 (!shouldShowAllProducts && (
//                   <>
//                     <div className="flex justify-between items-center lg:px-0 px-4 w-full">
//                       <span className="w-[max-content] text-[#0A1932] font-fredoka tex-[24px] font-semibold">
//                         Search Results
//                       </span>
//                     </div>
//                     <div className="w-full lg:grid lg:grid-cols-3 px-4 md:px-2 lg:px-0 grid grid-cols-2 overflow-hidden gap-2">
//                       {filteredProducts.map((product) => (
//                         <div key={product.id} className="border">
//                           <Link href={`/shop/${product.id}`}>
//                             <LocalMobileProducts
//                               image={product.thumbnail.url}
//                               title={product.title}
//                               price={product.salePrice}
//                             />
//                           </Link>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 ))}

//               {/* Message if no matching products found */}
//               {searchTerm && filteredProducts.length === 0 && (
//                 <div className="text-center clarabodyTwo text-red-500 ">
//                   No matching products found. Here are some products you may
//                   like:
//                 </div>
//               )}

//               {/* Render filtered products */}
//               <div className="w-full md:grid md:grid-cols-2 pl-4 md:pl-2 lg:px-0 flex flex-row overflow-x-scroll scrollbar-hidden gap-2">
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((product) => (
//                     <LocalMobileProducts
//                       key={product.id}
//                       image={product.thumbnail.url}
//                       title={product.title}
//                       price={product.salePrice}
//                     />
//                   ))
//                 ) : (
//                   <>
//                     <div className="w-full md:grid md:grid-cols-1 pl-4 md:pl-2 lg:px-0 flex flex-row overflow-x-scroll scrollbar-hidden gap-2">
//                       {/* <div className="w-[max-content] text-[#0A1932] font-fredoka tex-[24px] font-semibold">
//                         No matching Product Found{" "}
//                       </div> */}
//                       {sortedProducts.map((product) => (
//                         <div key={product.id} className="border">
//                           <Link href={`/shop/${product.id}`}>
//                             <LocalMobileProducts
//                               image={product.thumbnail.url}
//                               title={product.title}
//                               price={product.salePrice}
//                             />
//                           </Link>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Display All Products Below */}
//               <div className="flex flex-col justify-start items-start gap-2 md:gap-4 w-full">
//                 <div className="flex justify-between items-center px-4 lg:px-0 w-full">
//                   <span className="w-[max-content] text-[#0A1932] font-fredoka tex-[24px] font-semibold">
//                     All Products
//                   </span>
//                 </div>
//                 {/* <div className="w-full lg:grid lg:grid-cols-3 px-4 md:px-2 lg:px-0 grid grid-cols-2 overflow-hidden gap-2">
//                   {products.map((product) => (
//                     <div key={product.id} className="border">
//                       <Link href={`/shop/${product.id}`}>
//                         <LocalMobileProducts
//                           image={product.thumbnail.url || ProductImage}
//                           title={product.title}
//                           price={product.salePrice}
//                         />
//                       </Link>
//                     </div>
//                   ))}
//                 </div> */}
//                 <ProductsList products={products} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <NewsLetter />
//       <BottomNavigation />
//     </>
//   );
// }
