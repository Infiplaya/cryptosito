import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Timeline } from "../components/Tweets/Timeline";

const Profile = () => {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <>Loading or not authenticated...</>;
  }

  const name = session?.user?.name as string;
  return (
    <>
      <main className="mx-auto flex min-h-screen w-screen flex-col p-4 align-middle lg:container lg:px-16">
        <h1 className="border-b border-gray-800 p-5 text-3xl font-bold">
          Profile
        </h1>
        <div className="mx-10 flex w-full flex-col self-center border-b border-gray-800 p-5">
          <div className="mt-10 self-center">
            {session.user?.image && (
              <Image
                src={session.user?.image}
                width={200}
                height={200}
                className={`mx-auto w-16 rounded-full`}
                alt={`profile pic`}
              ></Image>
            )}
            <h2 className="mt-5 text-center">{session.user?.name}</h2>
            <h2 className="mt-5 text-center">{session.user?.email}</h2>
          </div>
        </div>
        <div className="mt-5">
          <ul>
            <li className="text-xl hover:underline">
              <Link href={"/watchlist"}>Your Watchlist</Link>
            </li>

            <li className="text-xl hover:underline">
              <Link href={"/portfolio"}>Your Portfolio</Link>
            </li>
          </ul>
        </div>
        <h3 className="mt-5 -mb-5 text-center text-3xl font-bold">
          Your timeline
        </h3>
        <Timeline
          where={{
            author: {
              name,
            },
          }}
        />
      </main>
    </>
  );
};

export default Profile;
