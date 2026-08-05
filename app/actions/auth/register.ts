"use server"

import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "@/lib/queries/user";
import { RegisterFormData } from "@/lib/validations/auth";

export const registerUser = async (data: RegisterFormData) => {
    try{
  if (!data.name || !data.email || !data.password) {
    return {
      success: false,
      message: "All fields are required",
    };
  }

  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    return {
      success: false,
      message: "User with this email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  await createUser(data.name, data.email, hashedPassword);

  return {
    success: true,
    message: "User registered successfully",
  };
} catch (error) {
    console.error("Error registering user:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
}
};

