import { prisma } from "@/lib/prisma";
import { deleteTransaction } from "./actions";

function formatEur(cents: number) {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}€${(abs / 100).toFixed(2)}`;
}

export async function TransactionList() {
  const userEmail = (process.env.DEMO_EMAIL || "demo@finance-tracker.local").toLowerCase();
  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  const txs = user
    ? await prisma.transaction.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    : [];

  if (!txs.length) {
    return (
      <div className="rounded-xl border border-black/10 p-4 text-sm text-black/60">
        No transactions yet.
      </div>
    );
  }

  return (
    <ul className="grid gap-2">
      {txs.map((t) => {
        const sign = t.type === "INCOME" ? 1 : -1;
        return (
          <li
            key={t.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-black/10 p-4"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2">
                <span className="font-medium">{t.description}</span>
                <span className="text-xs rounded-full border border-black/10 px-2 py-0.5 text-black/60">
                  {t.type}
                </span>
                {t.category ? (
                  <span className="text-xs rounded-full border border-black/10 px-2 py-0.5 text-black/60">
                    {t.category}
                  </span>
                ) : null}
                {t.payment ? (
                  <span className="text-xs rounded-full border border-black/10 px-2 py-0.5 text-black/60">
                    {t.payment}
                  </span>
                ) : null}
              </div>
              <div className="text-xs text-black/50">
                {new Date(t.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2">
              <div className={sign > 0 ? "font-semibold text-emerald-700" : "font-semibold text-red-700"}>
                {sign > 0 ? "+" : "-"}
                {formatEur(t.amountCents)}
              </div>
              <form
                action={async () => {
                  "use server";
                  await deleteTransaction(t.id);
                }}
              >
                <button className="text-xs text-black/50 hover:text-black">Delete</button>
              </form>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
