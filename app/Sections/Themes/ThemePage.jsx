import Link from "next/link";
import { CategoryCard } from "..";

export default function ThemesPage({ themes }) {
  return (
    <>
      <section className="w-full h-auto bg-[#EAEAF5] items-center pb-32 justify-center flex flex-col gap-[20px]">
        <div className="claracontainer w-full flex flex-col overflow-hidden gap-8">
          <div className="claracontainer p-4 w-full flex flex-col overflow-hidden gap-4">
            <div className="text-[#0a1932] claraheading text-start capitalize">
              Upcoming Themes
            </div>
            <div className="grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full claracontainer">
              {/* {themes.map((theme) => (
                <div key={theme.id}>
                  <Link
                    key={theme.id}
                    href={`/p/our-themes/${theme.id}`}
                    onClick={() => console.log("Clicked Blog:", CategoryCard)}
                  >
                    <CategoryCard
                      schedulesDate={formattedLaunchTime}
                      image={theme.thumbnail.url}
                      description={theme.metaDesc.slice(0, 100)}
                      header={theme.title}
                    />
                  </Link>
                </div>
              ))} */}
              {themes.map((theme) => {
                const formattedLaunchTime = theme.launchTime
                  ? new Date(theme.launchTime).toLocaleString()
                  : "No launch date available";

                return (
                  <div key={theme.id}>
                    <Link href={`/p/our-themes/${theme.id}`}>
                      <CategoryCard
                        schedulesDate={formattedLaunchTime}
                        image={theme.thumbnail.url}
                        description={theme.metaDesc.slice(0, 100)}
                        header={theme.title}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
