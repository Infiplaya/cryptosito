import React from "react";
import { useSession, signIn } from "next-auth/react";

export const GrayButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  return (
    <button
      className="rounded-lg bg-gray-200 px-3 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800"
      onClick={() => {
        !session ? signIn() : null;
      }}
    >
      {children}
    </button>
  );
};
