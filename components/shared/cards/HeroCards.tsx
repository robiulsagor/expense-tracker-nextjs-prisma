"use client"

import React, { useState } from "react";
import SingleCard from "./SingleCard";
import MonthSelector from "../MonthSelector";

const HeroCards = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className=" bg-slate-50 p-6 rounded-lg shadow-md">
      <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />

      <div className=" flex flex-wrap gap-6">
        <SingleCard amount={1000} type="income" />
        <SingleCard amount={500} type="expense" />
        <SingleCard amount={500} type="balance" />
      </div>
    </div>
  );
};

export default HeroCards;
