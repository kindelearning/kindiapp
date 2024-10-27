import { Team } from "@/app/Widgets";
import { Thomas } from "@/public/Images";

export default function TheTeam() {
  return (
    <section className="w-full h-auto bg-[#EAEAF5] items-center justify-center pt-8 pb-16 flex flex-col gap-[20px]">
      <div className="claracontainer  md:px-0 lg:px-4 p-4 w-full flex flex-col gap-8">
        <div className="flex w-full justify-center heading items-center flex-col">
          <h2 className="text-center text-red clarascript">
            Life-Defining Early Learning Through Play
          </h2>
          <h1 className="w-full text-center">
            <span className="text-[#3f3a64] claraheading">Meet The </span>
            <span className="text-red claraheading">Team</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-[20px] justify-between items-start">
          <Team
            bgColor="#ff8e00"
            imageSrc={Thomas}
            title="JANINE HAENEL"
            degree="BA (Hons) Childhood Studies (Level 6)"
            description="Janine's nickname is &quot;The Child Whisperer&quot;. Her ability to assess the developmental needs of children and deliver educational activities to satisfy them is legendary. Janine's time as an early learning expert has developed educational play approaches that deliver tangible results."
            // description={stories[0].aboutJanineHaenel}
          />
          <Team
            imageSrc={Thomas}
            bgColor="#f15c57"
            title="THOMAS DOBINSOM"
            degree="Early Years  Educator (Level 3)"
            description='With more than a decade of experience in preschool environments, his commitment to early years education has earned him two "Outstanding" Ofsted ratings. Working with early learners has given Tom unique insights into those crucial formative years.'
            // description={stories[0].aboutThomasDobinsom}
          />
        </div>
      </div>
    </section>
  );
}
