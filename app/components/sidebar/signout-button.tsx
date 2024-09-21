"use client";

import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

export default function SignOutButton() {
  const handleSignOutClick = () => signOut();

  return (
    <button
      onClick={handleSignOutClick}
      className="x flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white active:bg-gray-400 xl:h-fit xl:w-full xl:p-2.5"
    >
      <span className="hidden w-full items-center justify-between xl:flex">
        Sair
        <LogOutIcon size={16} />
      </span>

      <LogOutIcon size={20} className="xl:hidden" />
    </button>
  );
}
