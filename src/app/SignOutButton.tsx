"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="text-xs text-black/50 hover:text-black"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Sign out
    </button>
  );
}
