"use client";

import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import MonthSelector from "../MonthSelector";
import { useRouter } from "next/navigation";

const HeroCards = ({
  summary,
}: {
  summary: { income: number; expense: number };
}) => {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    router.push(
      `?month=${currentMonth.getMonth() + 1}&year=${currentMonth.getFullYear()}`,
    );
  }, [currentMonth, router]);

  return (
    <div className=" bg-slate-50 p-6 rounded-lg shadow-md">
      <MonthSelector
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <div className="flex flex-wrap gap-6">
        <SingleCard amount={summary.income} type="income" />
        <SingleCard amount={summary.expense} type="expense" />
        <SingleCard amount={summary.income - summary.expense} type="balance" />
      </div>
    </div>
  );
};

export default HeroCards;
