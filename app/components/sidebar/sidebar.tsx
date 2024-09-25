import { User } from "@prisma/client";
import Header from "./header";
import WriteButton from "./write-button";
import SignOutButton from "./signout-button";
import Nav from "./nav";

interface SidebarProps {
  user: User;
  setShowForm: () => void;
}

export default function Sidebar({ user, setShowForm }: SidebarProps) {
  return (
    <div className="relative h-fit w-full space-y-5 xl:h-screen xl:max-w-80">
      <div className="px-5 pt-5">
        <Header user={user} />
      </div>

      <div className="px-5">
        <WriteButton setShowForm={setShowForm} />
      </div>

      <div className="px-5">
        <Nav />
      </div>

      <div className="absolute bottom-5 hidden w-full px-5 xl:flex">
        <SignOutButton />
      </div>
    </div>
  );
}
