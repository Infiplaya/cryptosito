import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Timeline } from "../../modules/common/components/Timeline";

const Community: NextPage = () => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <>Loading or not authenticated...</>;
  }

  return (
    <>
      <Head>
        <title>Community</title>
        <meta name="description" content="Cryptosito community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen w-screen flex-col p-4 align-middle lg:container lg:px-16">
        <Timeline where={{}} />
      </main>
    </>
  );
};

export default Community;
