"use client";

import ProfileEdit from "../edit/page";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { getUserDataByEmail } from "@/lib/hygraph";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import Link from "next/link";

export default function ProfileUpdate() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hygraphUser, setHygraphUser] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      getUserDataByEmail(user.email).then((data) => {
        setHygraphUser(data);
      });
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );

  return (
    <>
      <section className="w-full pb-32 bg-[#f5f5f5] flex flex-col gap-0 justify-center items-start">
        {user && hygraphUser ? (
          <ProfileEdit userId={hygraphUser.id} />
        ) : (
          <div className="claracontainer">
            <Link href="/auth/sign-up" className="clarabutton">
              Please Login to use this feature!
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
