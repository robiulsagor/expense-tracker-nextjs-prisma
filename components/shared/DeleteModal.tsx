"use client";

import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTransactionStore } from "@/store/transaction";
import { deleteTransactionAction } from "@/app/actions/transactions/delete";
import { toast } from "react-toastify";

const DeleteModal = () => {
  const showDeleteModal = useTransactionStore((state) => state.showDeleteModal);
  const closeDeleteModal = useTransactionStore(
    (state) => state.closeDeleteModal,
  );
  const closeDetails = useTransactionStore(state=> state.closeDetails);
  const selectedTransactionId = useTransactionStore(
    (state) => state.selectedTransactionId,
  );

  // Function to handle the deletion of the transaction
  const deleteTransaction = async () => {
    if (!selectedTransactionId) {
      closeDeleteModal();
      return;
    }

    const result = await deleteTransactionAction(selectedTransactionId);
    if (result.success) {
      closeDeleteModal();
      closeDetails();
      toast.success(result.message);
    } else {
      console.error(result.message);
      toast.error(result.message);
    }
  };

  return (
    <AlertDialog open={showDeleteModal} onOpenChange={closeDeleteModal}>
      <AlertDialogContent size="default">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Transaction?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this Transaction. This action cannot be
            undone. <br />
            Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive"
          onClick={()=> deleteTransaction()}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
