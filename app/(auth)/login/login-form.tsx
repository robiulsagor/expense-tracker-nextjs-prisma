"use client";

import TitleCard from "@/components/shared/auth/title-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import FieldError from "@/components/shared/auth/FieldError";
import { login } from "@/app/actions/auth/login";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (
    <div className=" w-full flex flex-col lg:flex-row p-1 lg:p-10 gap-5">
      <TitleCard subtitle="Login to your account" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            {...register("email")}
          />
          {errors.email && (
            <FieldError message={errors.email.message as string} />
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            className="w-full"
            {...register("password")}
          />
          {errors.password && (
            <FieldError message={errors.password.message as string} />
          )}
        </div>

        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          Login
        </Button>
        <div className="flex flex-col space-y-2 text-sm text-slate-500">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <span className="text-blue-500">Reset it</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
