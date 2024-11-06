import ThemesPage from "@/app/Sections/Themes/ThemePage";
import { getThemes } from "@/lib/hygraph";

export default async function OurThemes() {
  const themesData = await getThemes();

  if (!themesData || themesData.length === 0) {
    console.log("No themes found");
    return <div>No themes found!</div>;
  }

  return (
    <section className="w-full bg-[#ffffff] flex flex-col gap-0 justify-center items-center">
      <ThemesPage themes={themesData} />
    </section>
  );
}
