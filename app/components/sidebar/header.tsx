import { User } from "@prisma/client";
import Image from "next/image";
import SignOutButton from "./signout-button";

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="flex items-center justify-between rounded-xl bg-white p-2.5 shadow-sm">
      <div className="flex items-center gap-2.5">
        <Image
          src="/logo.png"
          alt="Sendify Logo"
          height={219}
          width={219}
          className="w-10"
        />
        <div>
          <h2 className="text-base font-semibold">
            {user.name} {user.lastName}
          </h2>
          <p className="text-sm text-foreground">{user.email}</p>
        </div>
      </div>

      <div className="xl:hidden">
        <SignOutButton />
      </div>
    </header>
  );
}
