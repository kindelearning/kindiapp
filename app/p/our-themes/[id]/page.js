import { getAllThemeIds, getThemeById } from "@/lib/hygraph";
import ThemeDetailClient from "./ThemeDetailClient";
import Image from "next/image";
import { ThemeDummy } from "@/public/Images";

// Fetch dynamic IDs for static generation in the App Router
export async function generateStaticParams() {
  const ids = await getAllThemeIds(); // Fetch theme IDs dynamically
  console.log("Themes Ids:", ids); // Debugging - Remove for production

  return ids.map((id) => ({
    id: id.toString(), // Ensure ID is a string
  }));
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

// export default async function ThemeDetailPage({ params }) {
//   const { id } = params;

//   // Fetch theme data on the server side based on ID
//   const theme = await getThemeById(id);

//   if (!theme) {
//     return <div>Theme not found!</div>; // Show message if theme doesn't exist
//   }

//   return <ThemeDetailClient theme={theme} />; // Pass theme data to client component
// }

export default async function ThemePage({ params }) {
  const { id } = params;
  const themeData = await fetchThemeById(id);
  console.log("Object found", themeData);
  if (!themeData) {
    notFound(); // If the theme is not found, show the 404 page
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