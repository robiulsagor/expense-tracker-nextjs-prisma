import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className=" w-full flex flex-col lg:flex-row p-1 lg:p-10">
      <div className="flex-1 flex items-center justify-center flex-col space-y-2 min-h-[120px]">
        <p className="text-2xl  font-bold text-slate-700">Expense Tracker</p>
        <p className=" text-slate-500">Login to your account</p>
      </div>

      <form action="" className="flex-1 space-y-4">
        <Input type="email" placeholder="Email" className="w-full" />
        <Input type="password" placeholder="Password" className="w-full" />
        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
          Login
        </Button>
        <div className="flex flex-col space-y-2 text-sm text-slate-500">

        <p>Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Sign up</Link></p>
        <p>Forgot your password? <Link href="/reset-password" className="text-blue-500">Reset it</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
