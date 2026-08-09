"use server"

import { auth } from "@/auth";
import { getTransactionById } from "@/lib/queries/transaction";

export const getTransactionByIdAction = async (transactionId: number) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const transaction = await getTransactionById(
      session.user.id,
      transactionId.toString(),
    );
    if (!transaction) {
      return {
        success: false,
        message: "Transaction not found",
      };
    }

    return {
      success: true,
      data: transaction,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error fetching transaction",
    };
  }
};
