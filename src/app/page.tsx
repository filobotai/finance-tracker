import { AddTransactionForm } from "./AddTransactionForm";
import { TransactionList } from "./TransactionList";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-900">
      <main className="mx-auto grid w-full max-w-xl gap-6">
        <header className="grid gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Finance Tracker</h1>
          <p className="text-sm text-black/60">
            Minimal tracker (demo user). Add an expense/income below.
          </p>
        </header>

        <AddTransactionForm />

        <section className="grid gap-3">
          <h2 className="text-sm font-semibold text-black/70">Recent</h2>
          <TransactionList />
        </section>

        <footer className="text-xs text-black/40">
          Powered by Next.js + Prisma + Supabase.
        </footer>
      </main>
    </div>
  );
}
