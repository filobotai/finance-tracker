"use client";

import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button
      className="h-10 rounded-lg bg-black px-4 text-sm font-medium text-white"
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Continue with Google
    </button>
  );
}
