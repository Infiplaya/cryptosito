import Navbar from "../components/Header/Header";
import { useSession, signIn } from "next-auth/react";
import Image from "next/future/image";

const Profile = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Navbar />
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
          <div className="mt-10 self-center">
            <h2 className="lg:text-3xl">*Something*</h2>
          </div>
        </main>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <main className="flex h-96 items-center justify-center">
        <button
          onClick={() => signIn()}
          className="w-32 self-center rounded-lg bg-blue-500 p-2 font-medium"
        >
          Sign In
        </button>
      </main>
    </>
  );
};
export default Profile;
