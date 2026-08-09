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
import { createTransactionAction } from "@/app/actions/transactions/create";
import { toast } from "react-toastify";
import { useTransactionStore } from "@/store/transaction";
import { useEffect, useState } from "react";

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

const defaultTransactionValues: TransactionFormData = {
  type: "income",
  category: "",
  specifically: "",
  amount: 0,
  note: "",
  date: new Date().toISOString().split("T")[0],
};


const Tracker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultTransactionValues,
  });

  const editingTransaction = useTransactionStore(
    (state) => state.editingTransaction,
  );
  const cancelEditing = useTransactionStore((state) => state.cancelEditing);

    const type = useWatch({
    control,
    name: "type",
  });


   useEffect(() => {
    if (!editingTransaction) return;

    // Populate the form with the editing transaction data
    reset({
      type: editingTransaction.type,
      category: editingTransaction.category,
      specifically: editingTransaction.specifically ?? "",
      amount: editingTransaction.amount,
      note: editingTransaction.note ?? "",
      date:
        editingTransaction.date instanceof Date
          ? format(editingTransaction.date, "yyyy-MM-dd")
          : editingTransaction.date,
    });
  }, [editingTransaction, reset]);


  const onSubmit = async (data: TransactionFormData) => {
    console.log("data submitted", data);

    const result = await createTransactionAction(data);

    if (!result.success) {
      console.error("Failed to create transaction:", result.message);
      toast.error(result.message); // Display error message using react-toastify
    } else {
      toast.success(result.message); // Display success message using react-toastify

      reset();
    }
  };

  
  console.log("Editing Transaction:", editingTransaction);

  const cancelEditingTransaction = () => {
    cancelEditing();
    reset({
      type: "income",
      category: "",
      specifically: "",
      amount: 0,
      note: "",
    }); // Reset the form to default values
  };

  return (
    <div className="bg-slate-50 p-6 rounded-lg shadow-md flex flex-col gap-3 md:gap-4">
      <h2 className="text-lg font-semibold">
        {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex w-full border rounded-lg overflow-hidden text-xs md:text-sm">
          <button
            type="button"
            onClick={() => setValue("type", "expense")}
            className={`flex-1 text-center py-2 cursor-pointer  ${type === "expense" ? "bg-teal-700 text-white" : "hover:bg-teal-50"}`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setValue("type", "income")}
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
            {editingTransaction ? "Update" : "Add Transaction"}
          </Button>
          <Button
            type="button"
            onClick={cancelEditingTransaction}
            className="bg-red-800 text-white flex-1 "
          >
            {editingTransaction ? "Cancel" : "Reset"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tracker;
