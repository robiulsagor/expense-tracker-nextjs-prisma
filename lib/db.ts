import "server-only";
import {Pool} from "pg";

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
})

export const testConnection = async () => {
    try {
        await db.connect();
        console.log("Database connection successful");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}