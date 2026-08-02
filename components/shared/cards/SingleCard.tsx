import { TrendingDown, TrendingUp, Wallet2 } from "lucide-react";
import React from "react";

const SingleCard = ({
  amount,
  type,
}: {
  amount: number;
  type: "income" | "expense" | "balance";
}) => {
  return (
    <div className="flex-1 bg-slate-50 p-6 rounded-lg shadow-md flex  justify-between items-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-bold">{amount}</h2>
        <p className="text-sm text-slate-500 capitalize">{type}</p>
      </div>
      <div>
        {
            type === "income" ? (
                <TrendingUp size={35} className="text-green-500 text-4xl" />
            ) : type === "expense" ? (
                <TrendingDown size={35} className="text-red-500 text-4xl" />
            ) : (
                <Wallet2 size={35} className="text-blue-500 text-4xl" />
            )
        }
      </div>
    </div>
  );
};

export default SingleCard;
