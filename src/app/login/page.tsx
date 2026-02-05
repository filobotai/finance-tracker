import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import { SignInButton } from "./sign-in";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 text-zinc-900">
      <main className="mx-auto grid w-full max-w-md gap-6 rounded-2xl border border-black/10 bg-white p-6">
        <header className="grid gap-1">
          <h1 className="text-xl font-semibold">Sign in</h1>
          <p className="text-sm text-black/60">
            Use Google to access your personal finance tracker.
          </p>
        </header>

        <SignInButton />
      </main>
    </div>
  );
}
