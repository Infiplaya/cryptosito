import { Popover, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Image from "next/future/image";
import { Fragment } from "react";
import Link from "next/link";

export default function PopoverComponent() {
  const { data: session } = useSession();

  return (
    <div className="w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-lg text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-0`}
            >
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  alt="profile"
                  width={40}
                  height={40}
                  className={`rounded-full`}
                ></Image>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-slate-500 ring-opacity-5 dark:ring-slate-700">
                  <div className="relative grid gap-3"></div>
                  <div className="space-y-3 bg-slate-300 p-4 dark:bg-slate-800">
                    <span className="text-sm">
                      <Link href={`/profile`}>Profile</Link>
                    </span>
                    <span className="block text-sm">
                      <Link href={`/watchlist`}>Watchlist</Link>
                    </span>
                    <span className="block text-sm">
                      <Link href={`/portfolio`}>Portfolio</Link>
                    </span>
                    <button className="rounded-lg bg-blue-700 px-3 py-1 text-slate-200  dark:bg-blue-500 dark:text-slate-900">
                      Sign out
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
