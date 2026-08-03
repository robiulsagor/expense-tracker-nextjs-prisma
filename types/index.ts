export type TRANSACTION_TYPE = "income" | "expense";

export interface TransactionData {
    id: number;
    type: TRANSACTION_TYPE;
    category: string;
    specifically: string;
    amount: number;
    note: string;
}