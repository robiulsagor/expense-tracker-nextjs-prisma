"use client"

import React, { useState } from "react";
import SingleCard from "./SingleCard";
import MonthSelector from "../MonthSelector";

const HeroCards = ({summary}: { summary: { income: number; expense: number } }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className=" bg-slate-50 p-6 rounded-lg shadow-md">
      <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />

      <div className="flex flex-wrap gap-6">
        <SingleCard amount={summary.income} type="income" />
        <SingleCard amount={summary.expense} type="expense" />
        <SingleCard amount={summary.income - summary.expense} type="balance" />
      </div>
    </div>
  );
};

export default HeroCards;
