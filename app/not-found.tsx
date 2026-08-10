import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
          <SearchX className="h-8 w-8" strokeWidth={1.8} />
        </div>

        {/* Error Code */}
        <p className="text-sm font-semibold tracking-widest text-slate-400">
          ERROR 404
        </p>

        {/* Heading */}
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-4 text-base leading-7 text-slate-500">
          Sorry, we couldn’t find the page you’re looking for. It may have
          been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Action */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
