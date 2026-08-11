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

  return result.rows[0];
}

export async function getTransactions(
  userId: string,
  month: number,
  year: number,
) {
  const result = await db.query(
    " SELECT * FROM transactions WHERE user_id = $1 AND date >= make_date($2, $3, 1) AND date < make_date($2, $3, 1) + INTERVAL '1 month'      ORDER BY date DESC",
    [userId, year, month],
  );

  return result.rows;
}

export async function getTransactionById(
  userId: string,
  transactionId: string,
) {
  const result = await db.query(
    `
    SELECT * FROM transactions WHERE user_id = $1 AND id = $2`,
    [userId, transactionId],
  );
  return result.rows[0];
}

export async function getTransactionSummary(
  userId: string,
  month: number,
  year: number,
) {
  const result = await db.query(
    `
      SELECT
        COALESCE(
          SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END),
          0
        ) AS income,

        COALESCE(
          SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END),
          0
        ) AS expense

      FROM transactions
      WHERE user_id = $1  AND date >= make_date($2, $3, 1)
        AND date < make_date($2, $3, 1) + INTERVAL '1 month'
    `,
    [userId, year, month],
  );

  return result.rows[0];
}

export async function deleteTransaction(userId: string, transactionId: number) {
  const result = await db.query(
    `
    DELETE FROM transactions WHERE user_id = $1 AND id = $2 RETURNING *
    `,
    [userId, transactionId],
  );

  return result.rows[0];
}

export async function updateTransaction(
  userId: string,
  transactionId: number,
  data: TransactionFormData,
) {
  const result = await db.query(
    `
    UPDATE transactions SET type = $1, category = $2, specifically = $3, amount = $4, note = $5, date = $6 WHERE user_id = $7 AND id = $8 RETURNING *
    `,
    [
      data.type,
      data.category,
      data.specifically || null,
      data.amount,
      data.note || null,
      data.date,
      userId,
      transactionId,
    ],
  );
  return result.rows[0];
}
