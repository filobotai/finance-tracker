import { SignInButton } from "./sign-in";

export default function LoginPage() {
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

        <p className="text-xs text-black/40">
          If you hit an error, check the deployment logs in Vercel.
        </p>
      </main>
    </div>
  );
}
