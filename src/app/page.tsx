import { AddTransactionForm } from "./AddTransactionForm";
import { TransactionList } from "./TransactionList";
import { SignOutButton } from "./SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-900">
      <main className="mx-auto grid w-full max-w-xl gap-6">
        <header className="grid gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight">Finance Tracker</h1>
            <SignOutButton />
          </div>
          <p className="text-sm text-black/60">
            Signed in as {session?.user?.email}.
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
