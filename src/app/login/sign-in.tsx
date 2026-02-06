"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function SignInButton() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  return (
    <button
      className="h-10 rounded-lg bg-black px-4 text-sm font-medium text-white disabled:opacity-60"
      type="button"
      disabled={isSigningIn}
      onClick={async () => {
        setIsSigningIn(true);
        try {
          await signIn("google", { callbackUrl: "/" });
        } finally {
          // If a redirect doesn't happen (e.g. popup blocked or error), allow retry.
          setIsSigningIn(false);
        }
      }}
    >
      {isSigningIn ? "Continuing…" : "Continue with Google"}
    </button>
  );
}
