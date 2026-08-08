"use server";

import { auth } from "@/auth";
import { createTransaction } from "@/lib/queries/transaction";
import { transactionSchema } from "@/lib/validations/transaction";

export const createTransactionAction = async (data: unknown) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const parsed = transactionSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid data",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const transaction = await createTransaction(session.user.id, parsed.data);

    return {
      success: true,
      message: "Transaction created successfully",
      transaction,
    };
  } catch (error) {
    console.error("Create transaction error:", error);

    return {
      success: false,
      message: "Failed to create transaction",
    };
  }
};
