"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Tracker = () => {
  const [data, setData] = useState({
    type: "income",
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  return (
    <div className="bg-slate-50 p-6 rounded-lg shadow-md flex flex-col gap-6">
      <h2 className="text-lg font-semibold">Tracker</h2>

      <div className="flex w-full border rounded-lg overflow-hidden">
        <button
          onClick={() => setData({ ...data, type: "expense" })}
          className={`flex-1 text-center py-1.5 cursor-pointer  ${data.type === "expense" ? "bg-teal-700 text-white" : "hover:bg-teal-50"}`}
        >
          Expense
        </button>
        <button
          onClick={() => setData({ ...data, type: "income" })}
          className={`flex-1 text-center py-1.5 cursor-pointer  ${data.type === "income" ? "bg-teal-700 text-white" : "hover:bg-teal-50 "}`}
        >
          Income
        </button>
      </div>

      <Field>
        <FieldLabel className="text-slate-600" htmlFor="category">
          Category
        </FieldLabel>

        <Select id="category" name="category">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel className="text-slate-600" htmlFor="specifically">
          Specifically (Optional)
        </FieldLabel>
        <Input id="specifically" type="text" placeholder="Enter what specifically..." />
      </Field>

      <Field>
        <FieldLabel className="text-slate-600" htmlFor="amount">
          Amount
        </FieldLabel>
        <Input id="amount" type="number" placeholder="Enter amount" />
      </Field>

      <Field>
        <FieldLabel className="text-slate-600" htmlFor="note">
          Note (Optional)
        </FieldLabel>
        <Input id="note" type="text" placeholder="Enter note" />
      </Field>

      <div className="flex gap-3 items-center justify-center">
        <Button className="bg-teal-700 text-white flex-1">Submit</Button>
        <Button className="bg-red-800 text-white flex-1 ">Reset</Button>
      </div>
    </div>
  );
};

export default Tracker;
