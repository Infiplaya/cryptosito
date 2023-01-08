import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import watchlistImg from "../../public/watchlist.jpeg";
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
        <h1 className="border-b border-gray-800 py-10 text-3xl font-bold">
          Profile
        </h1>
        <div className="mx-10 flex w-full flex-col py-10">
          <div className="mt-10 self-start">
            {session.user?.image && (
              <Image
                src={session.user?.image}
                width={200}
                height={200}
                className={`mx-auto w-16 rounded-full`}
                alt={`profile pic`}
              ></Image>
            )}
            <h2 className="mt-5 text-center">
              Welcome back, {session.user?.name}
            </h2>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-5 border-b border-gray-200 py-10 dark:border-gray-700">
          <Card
            title="Watchlist"
            description="Watchlist is a place where you can keep track of your favorite coins.
          Simply add them via coin page or the coins table."
          />
          <Card
            title="Portfolio"
            description="Portfolio is a place where you can see all the coins you have purchased via individual coin pages"
          />
          <Card
            title="Community"
            description="Community is a place where you can see timeline of all the tweets user created. Go post about something!"
          />
        </div>
        <h3 className="mt-20 text-3xl font-bold">
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

const Card: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="p-5">
        <Link href={`/${title.toLowerCase()}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <Link
          href={`/${title.toLowerCase()}`}
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Go to {title}
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
