"use client";

import { useTracker } from "@/store";
import { TransactionData } from "@/types";
import { CircleDollarSign, Eye } from "lucide-react";

const IncomeCard = ({ data }: { data: TransactionData[] }) => {
  const toggleOpen = useTracker((state) => state.toggle);

  return (
    <div className="bg-slate-50 shadow-md rounded-lg p-4">
      <div className=" flex items-center gap-3 border-b border-slate-200 pb-2">
        <div className="bg-teal-700 flex items-center justify-center rounded-lg p-2">
          <CircleDollarSign className="w-8 h-8 text-slate-200" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-700">Income</h2>
          <p className="text-sm text-gray-500">
            Total income list for this month
          </p>
        </div>
      </div>

      <div className="mt-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-slate-200 py-2"
          >
            <div>
              <h3 className="text-sm font-medium text-slate-700">{item.category}</h3>
              <p className="text-xs text-gray-500">27 Jul, 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <p className=" font-semibold text-slate-700">BDT {item.amount.toLocaleString()}</p>
              <div onClick={toggleOpen} className="cursor-pointer">
                <Eye className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeCard;
