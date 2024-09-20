"use client";

import { signOut } from "next-auth/react";
import { User as UserType } from "@prisma/client";

interface UserProps {
  user: UserType;
}

export default function User({ user }: UserProps) {
  const handleSignOutClick = () => signOut();

  return (
    <div className="space-y-1.5 rounded-xl border border-solid border-foreground bg-white p-5 text-center shadow-lg">
      <h2 className="text-xl font-semibold">
        {user.name} {user.lastName}
      </h2>
      <p>{user.username}</p>
      <p>{user.email}</p>

      <button
        onClick={handleSignOutClick}
        className="w-full rounded-xl bg-red-600 p-1.5 text-white active:bg-gray-400"
      >
        Sair
      </button>
    </div>
  );
}
