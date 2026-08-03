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

const ViewDetails = () => {
  const isOpen = useTracker((state) => state.isOpen);
  const toggleOpen = useTracker((state) => state.toggle);

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-700 border-b">
            Detail View
          </DialogTitle>
        </DialogHeader>
        <div className=" ">
          <div className="mt-3 flex flex-col gap-2">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="text-base font-semibold text-slate-700">Salary</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Specifically...</p>
              <p className="text-base font-semibold text-slate-700">Salary</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-base font-semibold text-slate-700">5000</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Note</p>
              <p className="text-base font-semibold text-slate-700">
                Some note about the transaction here......
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={toggleOpen}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
          Edit
          </Button>
          <Button
          variant="destructive"
            onClick={toggleOpen}
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
