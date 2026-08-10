"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex min-h-100 flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>

      <p className="text-sm text-slate-500">
        We couldn&apos;t load this page right now. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="rounded-md bg-teal-700 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
