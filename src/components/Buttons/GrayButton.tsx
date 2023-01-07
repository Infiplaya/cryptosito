import React from "react";
import { useSession, signIn } from "next-auth/react";

export const GrayButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  return (
    <button
      type="button"
      className="mr-2 mb-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      onClick={() => {
        !session ? signIn() : null;
      }}
    >
      {children}
    </button>
  );
};
