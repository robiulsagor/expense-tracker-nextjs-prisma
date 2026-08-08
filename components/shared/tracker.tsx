"use client";

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
import { Controller, useForm } from "react-hook-form";
import {
  TransactionFormData,
  transactionSchema,
} from "@/lib/validations/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch } from "react-hook-form";

const incomeCategories = [
  "Salary",
  "Business",
  "Freelance",
  "Investments",
  "Rental Income",
  "Gifts",
  "Other",
];

const expenseCategories = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Healthcare",
  "Entertainment",
  "Education",
  "Personal Care",
  "Travel",
  "Gifts & Donations",
  "Other",
];

export type Inputs = {
  category: string;
  specifically: string;
  date: string;
  amount: number;
  note: string;
};

const Tracker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),

    defaultValues: {
      type: "income",
      category: "",
      specifically: "",
      amount: 0,
      note: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    console.log("data submitted", data);
  };

  const type = useWatch({
    control,
    name: "type",
  });

  return (
    <div className="bg-slate-50 p-6 rounded-lg shadow-md flex flex-col gap-3 md:gap-4">
      <h2 className="text-lg font-semibold">Tracker</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex w-full border rounded-lg overflow-hidden text-xs md:text-sm">
          <button
            onClick={() => setValue("type", "expense")}
            {...register("type")}
            className={`flex-1 text-center py-2 cursor-pointer  ${type === "expense" ? "bg-teal-700 text-white" : "hover:bg-teal-50"}`}
          >
            Expense
          </button>
          <button
            onClick={() => setValue("type", "income")}
            {...register("type")}
            className={`flex-1 text-center py-2 cursor-pointer  ${type === "income" ? "bg-teal-700 text-white" : "hover:bg-teal-50 "}`}
          >
            Income
          </button>
        </div>

        <Field>
          <FieldLabel
            className="text-slate-600 text-xs md:text-sm"
            htmlFor="category"
          >
            Category <span className="text-red-500">*</span>
          </FieldLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                onOpenChange={field.onBlur}
              >
                <SelectTrigger
                  className={`w-full ${errors.category ? "border-red-500" : ""}`}
                >
                  <SelectValue
                    className="text-xs md:text-sm"
                    placeholder="Select a category"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {type === "income"
                      ? incomeCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))
                      : expenseCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.category && (
            <span className="text-red-500 text-xs">
              {errors.category.message}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel
            className="text-slate-600 text-xs md:text-sm"
            htmlFor="specifically"
          >
            Specifically (Optional)
          </FieldLabel>
          <Input
            className="text-xs md:text-sm"
            id="specifically"
            {...register("specifically")}
            type="text"
            placeholder="Enter what specifically..."
          />
        </Field>

        <Controller
          name="date"
          control={control}
          render={({ field, fieldState }) => {
            const selectedDate = field.value
              ? new Date(`${field.value}T00:00:00`)
              : undefined;

            return (
              <Field>
                <FieldLabel
                  className="text-slate-600 text-xs md:text-sm"
                  htmlFor="date"
                >
                  Date <span className="text-red-500">*</span>
                </FieldLabel>

                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        data-empty={!selectedDate}
                        className={`justify-start text-left font-normal data-[empty=true]:text-muted-foreground ${
                          fieldState.error ? "border-red-500" : ""
                        }`}
                      />
                    }
                  >
                    <CalendarIcon />

                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span className="text-xs md:text-sm">Pick a date</span>
                    )}
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) {
                          const formattedDate = format(date, "yyyy-MM-dd");

                          field.onChange(formattedDate);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>

                {fieldState.error && (
                  <span className="text-red-500 text-xs">
                    {fieldState.error.message}
                  </span>
                )}
              </Field>
            );
          }}
        />

        <Field>
          <FieldLabel
            className="text-slate-600 text-xs md:text-sm"
            htmlFor="amount"
          >
            Amount <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            className={`text-xs md:text-sm ${errors.amount ? "border-red-500" : ""}`}
            id="amount"
            {...register("amount", { required: true, valueAsNumber: true })}
            type="number"
            placeholder="Enter amount"
          />

          {errors.amount && (
            <span className="text-red-500 text-xs">
              {errors.amount.message as string}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel
            className="text-slate-600 text-xs md:text-sm"
            htmlFor="note"
          >
            Note (Optional)
          </FieldLabel>
          <Input
            className="text-xs md:text-sm"
            id="note"
            {...register("note")}
            type="text"
            placeholder="Enter note"
          />
        </Field>

        <div className="flex gap-3 items-center justify-center">
          <Button type="submit" className="bg-teal-700 text-white flex-1">
            Submit
          </Button>
          <Button type="reset" className="bg-red-800 text-white flex-1 ">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tracker;
