import { formatMonth } from "@/lib/helper";
import { ChevronLeft } from "lucide-react";

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
}: {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() - 1);

      return date;
    });
  };
  const isNextMonthDisabled =
    currentMonth.getMonth() === new Date().getMonth() &&
    currentMonth.getFullYear() === new Date().getFullYear();

  const handlenextMonth = () => {
    if (isNextMonthDisabled) return; // Prevent going to the next month if it's the current month

    setCurrentMonth((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() + 1);
      return date;
    });
  };

  return (
    <div className="flex gap-6 items-center justify-center text-lg mb-3">
      <button
        className="border border-slate-400 hover:bg-slate-200 transition p-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent *:active:scale-90 active:scale-90 disabled:active:scale-100"
        onClick={handlePrevMonth}
        aria-label="Go to Previous Month"
      >
        <ChevronLeft size={20} className="text-slate-600 " />
      </button>

      <p className="text-slate-500 min-w-40 text-center">
        {formatMonth(currentMonth)}
      </p>

      <button
        className="border border-slate-400 hover:bg-slate-200 transition p-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent active:scale-90 disabled:active:scale-100"
        onClick={handlenextMonth}
        disabled={isNextMonthDisabled}
        aria-label="Go to Next Month"
      >
        <ChevronLeft size={20} className="text-slate-600 rotate-180" />
      </button>
    </div>
  );
};

export default MonthSelector;
