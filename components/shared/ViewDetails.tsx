"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTracker } from "@/store";
import { Button } from "../ui/button";
import { useTransactionStore } from "@/store/transaction";
import { useEffect, useState } from "react";
import { getTransactionByIdAction } from "@/app/actions/transactions/get-transaction";
import { TransactionData } from "@/types";

const ViewDetails = () => {
  const toggleOpen = useTracker((state) => state.toggle);

  const selectedTransactionId = useTransactionStore(
    (state) => state.selectedTransactionId,
  );

  const isOpen = useTransactionStore((state) => state.isDetailViewOpen);

  const showDeleteModal = useTransactionStore(state => state.openDeleteModal)

  const closeDetails = useTransactionStore((state) => state.closeDetails);
  const [transaction, setTransaction] = useState<TransactionData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedTransactionId) {
      return;
    }

    const fetchTransaction = async () => {
      setLoading(true);

      const result = await getTransactionByIdAction(selectedTransactionId);
      if (result.success) {
        setTransaction(result.data);
      } else {
        console.error(result.message);
      }
      setLoading(false);
    };

    fetchTransaction();
  }, [selectedTransactionId]);

  // for editing transaction
  const startEditingTransaction = useTransactionStore(state => state.startEditingTransaction)

  return (
    <Dialog open={isOpen} onOpenChange={closeDetails}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-700 border-b">
            Detail View
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : transaction ? (
          <div className=" ">
            <div className="mt-3 flex flex-col gap-2">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-base font-semibold text-slate-700">
                  {transaction.category}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Specifically...</p>
                <p className="text-base font-semibold text-slate-700">
                  {transaction.specifically}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-base font-semibold text-slate-700">
                  BDT {transaction.amount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Note</p>
                <p className="text-base font-semibold text-slate-700">
                  {transaction.note}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <DialogFooter>
          <Button
            onClick={()=> startEditingTransaction(transaction!)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => showDeleteModal()}
            className=" px-4 py-2 rounded-md"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetails;
