import { auth } from "@/auth";
import { UserCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/app/actions/auth/logout";
import SidebarWrapper from "./SidebarWrapper";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-300">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-700">
          Expense Tracker
        </h2>
        <span className="text-xs md:text-sm text-slate-500">
          Track your expenses with ease
        </span>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <UserCircleIcon className="w-8 h-8 text-slate-700" />
        <div className="flex flex-col">
          {session?.user?.name && <span> {session.user.name}</span>}

          <form action={logout} className="">
            <Button
              className="text-sm text-slate-500 text-left cursor-pointer border border-slate-300 hover:bg-slate-200"
              type="submit"
              variant="ghost"
            >
              Logout
            </Button>
          </form>
        </div>
      </div>

      {/*sidebar for small screen */}
      <SidebarWrapper />
    </div>
  );
};

export default Navbar;
