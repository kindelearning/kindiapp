import { ProfileSegments } from "../Sections";

export default function ProfilePage() {
  return (
    <>
      <head>
        <title>Profile - Kindi Learning</title>
        <meta name="description" content="Your profile page on Kindilearning" />
      </head>
      <section className="w-full pb-32 bg-[#EAEAF5] flex flex-col gap-0 justify-center items-start">
        <ProfileSegments />
      </section>
    </>
  );
}
