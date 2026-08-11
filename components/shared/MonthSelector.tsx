"use client";

import { formatMonth } from "@/lib/helper";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Spinner } from "../ui/spinner";

const MonthSelector = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const month = Number(searchParams.get("month")) || new Date().getMonth();
  const year = Number(searchParams.get("year")) || new Date().getFullYear();

  const date = new Date(year, month, 1);

  const handlePrevMonth = () => {
    const newDate = date.getMonth() - 1;

    startTransition(() => {
      router.push(`?month=${newDate}&year=${date.getFullYear()}`);
    });
  };
  const isNextMonthDisabled =
    date.getMonth() - 1 === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear();

  const handlenextMonth = () => {
    if (isNextMonthDisabled) return; // Prevent going to the next month if it's the current month

    const newDate = date.getMonth() + 1;
    startTransition(() => {
      router.push(`?month=${newDate}&year=${date.getFullYear()}`);
    });
  };

  // if there is no month and year in the search params, set it to the current month and year
  useEffect(() => {
    startTransition(() => {
      router.push(`?month=${date.getMonth()}&year=${date.getFullYear()}`);
    });
  }, []);

  return (
    <div
      className={`flex gap-6 items-center justify-center text-lg mb-3 ${isPending ? "opacity-50" : "opacity-100"}`}
    >
      <button
        className="border border-slate-400 hover:bg-slate-200 transition p-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent *:active:scale-90 active:scale-90 disabled:active:scale-100"
        onClick={handlePrevMonth}
        aria-label="Go to Previous Month"
      >
        <ChevronLeft size={20} className="text-slate-600 " />
      </button>

      <div className="flex items-center gap-0.5">
        <p
          className={`min-w-40 text-center ${isPending ? "text-slate-300" : "text-slate-500"}`}
        >
          {formatMonth(date)}
        </p>
        {isPending && <Spinner />}
      </div>

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
