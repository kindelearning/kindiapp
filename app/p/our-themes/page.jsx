import NewHeader from "@/app/Sections/Mobile/NewHeader";
import ThemesPage from "@/app/Sections/Themes/ThemePage";
import { getThemes } from "@/lib/hygraph";

export default async function OurThemes() {
  const themesData = await getThemes();

  if (!themesData || themesData.length === 0) {
    console.log("No themes found");
    return <div>No themes found!</div>;
  }

  return (
    <>
      <NewHeader headerText="Our Themes"  />

      <section className="w-full bg-[#ffffff] -mt-[8px] rounded-t-[16px]  z-50  flex flex-col gap-0 justify-center items-center">
        <ThemesPage themes={themesData} />
      </section>
    </>
  );
}
