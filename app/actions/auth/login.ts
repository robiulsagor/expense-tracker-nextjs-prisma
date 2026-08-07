"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            field: "password",
            message: "Invalid email or password",
          };

        default:
          return {
            success: false,
            message: "Authentication failed",
          };
      }
    }

    throw error;
  }
};
