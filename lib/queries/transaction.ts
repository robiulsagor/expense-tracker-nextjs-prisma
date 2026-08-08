import { db } from "../db";
import { TransactionFormData } from "../validations/transaction";

export async function createTransaction(
  userId: string,
  data: TransactionFormData,
) {
  const result = await db.query(
    `INSERT INTO transactions (user_id, type, category, specifically, amount, note, date) VALUES (
        $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      userId,
      data.type,
      data.category,
      data.specifically || null,
      data.amount,
      data.note || null,
      data.date,
    ],
  );

  console.log("Transaction created:", result.rows[0]);
  return result.rows[0];
}

export async function getTransactions(userId: string) {
  const result = await db.query(
    "SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC",
    [userId]
  );
  return result.rows;
}