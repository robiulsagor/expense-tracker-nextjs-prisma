"use server";

import { auth } from "@/auth";
import { updateTransaction } from "@/lib/queries/transaction";
import { TransactionFormData } from "@/lib/validations/transaction";
import { TransactionData } from "@/types";
import { revalidatePath } from "next/cache";

export const updateTransactionAction = async (
  transactionId: number,
  updatedData: TransactionFormData,
) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const transaction = await updateTransaction(
      session.user.id,
      transactionId,
      updatedData,
    );
    if (!transaction) {
      return {
        success: false,
        message: "Transaction not found or could not be updated",
      };
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Transaction updated successfully",
      data: transaction as TransactionData,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update transaction",
    };
  }
};
