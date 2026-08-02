"use client";

import TitleCard from "@/components/shared/auth/title-card";
import FieldError from "@/components/shared/auth/FieldError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };
  return (
    <div className=" w-full flex flex-col lg:flex-row p-1 lg:p-10 gap-5">
      <TitleCard subtitle="Create a new account" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Name"
            className="w-full"
            {...register("name")}
          />
          {errors.name && (
            <FieldError message={errors.name.message as string}/>
          )}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            {...register("email")}
          />
          {errors.email && (
            <FieldError message={errors.email.message as string}/>
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
            <span className="text-red-500 text-xs">
              <FieldError message={errors.password.message as string}/>
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        >
          Register
        </Button>
        <div className="flex flex-col space-y-2 text-sm text-slate-500">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
