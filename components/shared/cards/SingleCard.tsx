import { TrendingDown, TrendingUp, Wallet2 } from "lucide-react";

const SingleCard = ({
  amount,
  type,
}: {
  amount: number;
  type: "income" | "expense" | "balance";
}) => {
  const bgColor =
    type === "income"
      ? "bg-green-100"
      : type === "expense"
        ? "bg-red-100"
        : amount >= 0
          ? "bg-blue-100"
          : "bg-red-100";
  return (
    <div
      className={`flex-1  p-6 rounded-lg shadow-md flex  justify-between items-center 
    ${bgColor}`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-bold">
          {Number(amount).toLocaleString()}
        </h2>
        <p className="text-sm text-slate-500 capitalize">{type}</p>
      </div>
      <div>
        {type === "income" ? (
          <TrendingUp size={35} className="text-green-500 text-4xl" />
        ) : type === "expense" ? (
          <TrendingDown size={35} className="text-red-500 text-4xl" />
        ) : (
          <Wallet2 size={35} className="text-blue-500 text-4xl" />
        )}
      </div>
    </div>
  );
};

export default SingleCard;
