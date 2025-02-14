import Image from "next/image";
import { ThemeDummy } from "@/public/Images";

export async function generateStaticParams() {
  try {
    // Fetch data from API
    const response = await fetch(
      "https://lionfish-app-98urn.ondigitalocean.app/api/our-themes"
    );
    const { data } = await response.json();

    // Ensure data exists
    if (!Array.isArray(data) || data.length === 0) {
      console.error("⚠️ No blogs found or API response is empty");
      return [];
    }

    // Log fetched document IDs for debugging
    console.log(
      "✅ Fetched blog document IDs:",
      data.map((blog) => blog.documentId)
    );

    return data.map((blog) => ({ id: blog.documentId })); // Use "documentId" instead of "id"
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return [];
  }
}

async function fetchThemeById(documentId) {
  const res = await fetch(
    `https://lionfish-app-98urn.ondigitalocean.app/api/our-themes/${documentId}?populate=*`
  );
  const data = await res.json();

  if (!data || !data.data) {
    return null; // If data is not found
  }

  return data.data;
}

export default async function ThemePage({ params }) {
  const { id } = params;
  const themeData = await fetchThemeById(id);
  console.log("Object found", themeData);
  if (!themeData) {
    console.log('No Data Found')
  }

  // Destructure the necessary properties from the fetched theme data
  const { Title, metaDesc, MainContent, LaunchTime, Thumbnail } = themeData;

  return (
    <>
      <section className="w-full h-auto py-0 lg:py-12 bg-[#EAEAF5] items-center justify-center pb-24 flex flex-col gap-[20px]">
        <div className="flex overflow-clip lg:rounded-xl lg:max-w-[960px] w-full">
          {Thumbnail ? (
            <img
              width={1400}
              height={600}
              src={`https://lionfish-app-98urn.ondigitalocean.app${Thumbnail[0]?.url}`}
              // src={Thumbnail?.url}
              alt={`Thumbnail for ${Title}`}
              className="w-full hover:scale-105 duration-300 lg:max-w-[960px] lg:rounded-xl h-60 md:h-[400px] lg:h-[400px] object-cover"
            />
          ) : (
            <Image
              width={1400}
              height={600}
              // src={`https://lionfish-app-98urn.ondigitalocean.app${Thumbnail?.url}`}
              src={ThemeDummy}
              alt={`Thumbnail for ${Title}`}
              className="w-full hover:scale-105 duration-300 lg:max-w-[960px] lg:rounded-xl h-60 md:h-[400px] lg:h-[400px] object-cover"
            />
          )}
        </div>
        <div className="claracontainer p-4 md:p-2 lg:p-4 w-full flex flex-col overflow-hidden gap-8">
          <div className="w-full mx-auto flex flex-col gap-4 justify-start items-start">
            <h2 className="text-[#3f3a64] w-full claraheading text-start">
              {Title || " Default Title"}
            </h2>
            <p className=" text-[#0a1932] text-start clarabodyTwo">
              {metaDesc || " Default metaDesc"}
            </p>
          </div>

          <div className="grid grid-cols-1  pb-12 gap-8">
            <div className="flex flex-col w-full gap-[12px]">
              <h3 className="text-2xl md:text-3xl font-semibold font-fredoka">
                About the theme
              </h3>
              <div
                dangerouslySetInnerHTML={{ __html: MainContent }}
                className="w-full prose text-[#757575] text-[20px] font-medium font-fredoka leading-[24px]"
              />
              {/* {MainContent || "  MainContent"} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
