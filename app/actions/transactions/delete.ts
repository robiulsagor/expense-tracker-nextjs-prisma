"use server";

import { auth } from "@/auth";
import { deleteTransaction } from "@/lib/queries/transaction";
import { revalidatePath } from "next/cache";

export const deleteTransactionAction = async (transactionId: number) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const deletedTransaction = await deleteTransaction(
      session.user.id,
      transactionId,
    );

    if (!deletedTransaction) {
      return {
        success: false,
        message: "Transaction not found or could not be deleted",
      };
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Transaction deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while deleting the transaction",
    };
  }
};
