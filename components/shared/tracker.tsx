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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const Tracker = () => {
  const [data, setData] = useState({
    type: "income",
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [date, setDate] = useState<Date>();

  return (
    <div className="bg-slate-50 p-6 rounded-lg shadow-md flex flex-col gap-3 md:gap-6">
      <h2 className="text-lg font-semibold">Tracker</h2>

      <div className="flex w-full border rounded-lg overflow-hidden text-xs md:text-sm">
        <button
          onClick={() => setData({ ...data, type: "expense" })}
          className={`flex-1 text-center py-2 cursor-pointer  ${data.type === "expense" ? "bg-teal-700 text-white" : "hover:bg-teal-50"}`}
        >
          Expense
        </button>
        <button
          onClick={() => setData({ ...data, type: "income" })}
          className={`flex-1 text-center py-2 cursor-pointer  ${data.type === "income" ? "bg-teal-700 text-white" : "hover:bg-teal-50 "}`}
        >
          Income
        </button>
      </div>

      <Field>
        <FieldLabel className="text-slate-600 text-xs md:text-sm" htmlFor="category">
          Category
        </FieldLabel>

        <Select id="category" name="category">
          <SelectTrigger className="w-full">
            <SelectValue className="text-xs md:text-sm" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
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
        <FieldLabel className="text-slate-600 text-xs md:text-sm" htmlFor="specifically">
          Specifically (Optional)
        </FieldLabel>
        <Input
        className="text-xs md:text-sm"
          id="specifically"
          type="text"
          placeholder="Enter what specifically..."
        />
      </Field>

      <Field>
        <FieldLabel className="text-slate-600 text-xs md:text-sm" htmlFor="date">
          Date
        </FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                data-empty={!date}
                className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
              />
            }
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span className="text-xs md:text-sm">Pick a date</span>}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </Field>

      <Field>
        <FieldLabel className="text-slate-600 text-xs md:text-sm" htmlFor="amount">
          Amount
        </FieldLabel>
        <Input className='text-xs md:text-sm' id="amount" type="number" placeholder="Enter amount" />
      </Field>

      <Field>
        <FieldLabel className="text-slate-600 text-xs md:text-sm" htmlFor="note">
          Note (Optional)
        </FieldLabel>
        <Input className='text-xs md:text-sm' id="note" type="text" placeholder="Enter note" />
      </Field>

      <div className="flex gap-3 items-center justify-center">
        <Button className="bg-teal-700 text-white flex-1">Submit</Button>
        <Button className="bg-red-800 text-white flex-1 ">Reset</Button>
      </div>
    </div>
  );
};

export default Tracker;
