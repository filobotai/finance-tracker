"use client";

import { useState, useTransition } from "react";
import { createTransaction } from "./actions";

function toDatetimeLocalValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function AddTransactionForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const now = toDatetimeLocalValue(new Date());

  return (
    <form
      className="grid gap-3 rounded-xl border border-black/10 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          try {
            await createTransaction(fd);
            e.currentTarget.reset();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
          }
        });
      }}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm text-black/70">Type</span>
          <select
            name="type"
            defaultValue="EXPENSE"
            className="h-10 rounded-lg border border-black/10 bg-white px-3"
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm text-black/70">Amount (EUR)</span>
          <input
            name="amount"
            inputMode="decimal"
            placeholder="12.30"
            className="h-10 rounded-lg border border-black/10 bg-white px-3"
            required
          />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="text-sm text-black/70">Description</span>
        <input
          name="description"
          placeholder="Coffee"
          className="h-10 rounded-lg border border-black/10 bg-white px-3"
          required
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm text-black/70">When</span>
        <input
          type="datetime-local"
          name="occurredAt"
          defaultValue={now}
          className="h-10 rounded-lg border border-black/10 bg-white px-3"
        />
      </label>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm text-black/70">Category (optional)</span>
          <input
            name="category"
            placeholder="Food"
            className="h-10 rounded-lg border border-black/10 bg-white px-3"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm text-black/70">Payment (optional)</span>
          <input
            name="payment"
            placeholder="Card"
            className="h-10 rounded-lg border border-black/10 bg-white px-3"
          />
        </label>
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <p className="text-sm text-black/50">
          Tip: use comma or dot for decimals.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="h-10 rounded-lg bg-black px-4 text-white disabled:opacity-60"
      >
        {isPending ? "Adding…" : "Add transaction"}
      </button>
    </form>
  );
}
