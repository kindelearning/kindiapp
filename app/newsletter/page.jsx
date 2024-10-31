import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Head from "next/head";
import Image from "next/image";
import { BottomNavigation, Footer, Header } from "../Sections";
import { NewsletterImg } from "@/public/Images";

export default function NewsLetter() {
  return (
    <>
      <Head>
        <title>Subscribe to Our Newsletter - Stay Updated!</title>
        <meta
          name="description"
          content="Subscribe to our newsletter and stay updated with the latest news, tips, and offers."
        />
      </Head>
      <Header className="sticky" />
      <section className="w-full min-h-[90vh] h-full bg-purple py-12 items-center justify-center flex flex-col gap-[20px]">
        <div className="claracontainer px-0 md:px-2 lg:px-0 w-full flex flex-col md:justify-between justify-center items-center gap-4 md:gap-0 lg:gap-12">
          <Image
            alt="Kindi"
            src={NewsletterImg}
            className="w-[320px] z-10 max-h-[400px] md:max-h-[500px] md:h-[300px] md:w-[400px]"
          />
          <div className="w-full justify-center items-center flex flex-col gap-4 px-4 md:pr-0 lg:px-4">
            <div className="flex flex-col w-full gap-[12px]">
              <h2 className="text-white claraheading uppercase text-center ">
                SUBSCRIBE TO OUR <br className="py-2" />
                <span className="text-red uppercase">Newsletter </span>
                <span className="text-[#ffffff] uppercase">for offers</span>
              </h2>

              <p className="text-white text-center clarabodyTwo">
                Plus *1st month free when you sign up for annual plan.
              </p>
            </div>
            <div className="flex w-full md:w-[800px] lg:w-[1000px] flex-col gap-2 items-center justify-center">
              <div className="flex w-full gap-1">
                <Input
                  type="text"
                  // value={firstName}
                  // onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                  className="rounded-full ring-offset-0 focus:ring-0 border-0 w-full"
                />
                <Input
                  type="text"
                  // value={lastName}
                  // onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                  className="rounded-full ring-offset-0 focus:ring-0 border-0 w-full"
                />
              </div>
              <Input
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your email"
                required
                className="rounded-full ring-offset-0 focus:ring-0 border-0 w-full"
              />
              <Input
                type="text"
                // value={phone}
                // onChange={(e) => setPhone(e.target.value)}
                placeholder="Contact Number"
                className="rounded-full ring-offset-0 focus:ring-0 border-0 w-full"
              />

              <Button className="px-12 md:w-[500px] text-center rounded-full text-white hover:border-2 uppercase font-bold text-[16px] hover:border-[#ffffff8a] border-[#ffffff] hover:bg-[#3f3a64] border-2 bg-red w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <BottomNavigation className="bottom-0 sticky" />
    </>
  );
}
