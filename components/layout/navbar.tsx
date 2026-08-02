import { UserCircleIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-300">
      <div>
        <h2 className="text-2xl font-bold text-slate-700">Expense Tracker</h2>
        <span className="text-sm text-slate-500">
          Track your expenses with ease
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <UserCircleIcon className="w-8 h-8 text-slate-700" />
        <div className="flex flex-col">
          <span>Robiul Islam</span>
          <span className="text-sm text-slate-500">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
