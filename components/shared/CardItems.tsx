import { useTracker } from "@/store";
import { TransactionData } from "@/types";
import { Eye } from "lucide-react";

const CardItems = ({data} : { data: TransactionData[] }) => {
  const toggleOpen = useTracker((state) => state.toggle);

  return (
     <div className="mt-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-slate-200 py-2"
          >
            <div>
              <h3 className="text-sm font-medium text-slate-700">{item.category}</h3>
              <p className="text-xs text-gray-500">{ item.date.toLocaleDateString("en-GB") }</p>
            </div>
            <div className="flex items-center gap-2">
              <p className=" font-semibold text-slate-700 text-sm">BDT {item.amount.toLocaleString()}</p>
              <div onClick={toggleOpen} className="cursor-pointer">
                <Eye className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}

export default CardItems
