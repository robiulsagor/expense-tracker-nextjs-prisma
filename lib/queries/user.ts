import "server-only";
import { db } from "../db";

export async function getUserByEmail(email: string) {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const result = await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password],
  );
  return result.rows[0];
}
