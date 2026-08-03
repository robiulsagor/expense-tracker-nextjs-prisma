"use client";

import { TransactionData } from "@/types";
import { CircleDollarSign } from "lucide-react";
import CardItems from "./CardItems";

const ExpenseCard = ({ data }: { data: TransactionData[] }) => {
  return (
     <div className="bg-slate-50 shadow-md rounded-lg p-4">
      <div className=" flex items-center gap-3 border-b border-slate-200 pb-2">
        <div className="bg-red-900/70 flex items-center rounded-lg p-2 ">
          <CircleDollarSign className="w-8 h-8 text-slate-200" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-700">Expense</h2>
          <p className="text-sm text-gray-500">
            Total expense list for this month
          </p>
        </div>
      </div>

       <CardItems data={data} />
    </div>
  );
};

export default ExpenseCard;
