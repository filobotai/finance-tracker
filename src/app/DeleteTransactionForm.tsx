"use client";

import { useTransition } from "react";

type Props = {
  label: string;
  action: () => void;
};

export function DeleteTransactionForm({ label, action }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(() => action());
      }}
      onSubmit={(e) => {
        if (!confirm(`Delete ${label}? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        disabled={isPending}
        className="text-xs text-black/50 hover:text-black disabled:opacity-60"
      >
        {isPending ? "Deleting…" : "Delete"}
      </button>
    </form>
  );
}
