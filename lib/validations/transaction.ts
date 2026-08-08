import {z} from "zod"

export const transactionSchema = z.object({
    type: z.enum(["income", "expense"], "Type must be either 'income' or 'expense'"),
    category: z.string().min(1, "Category is required"),
    specifically: z.string().optional(),
    amount: z.number("Amount is required").positive("Amount must be a positive number"),
    note: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
})

export type TransactionFormData = z.infer<typeof transactionSchema>