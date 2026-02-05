import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import { parseAllowedEmails, requiredEnv } from "@/lib/env";

const allowed = parseAllowedEmails();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: requiredEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requiredEnv("GOOGLE_CLIENT_SECRET"),
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      if (!email) return false;
      if (allowed.size === 0) return true; // if not set, allow any Google user
      return allowed.has(email);
    },
    async session({ session, user }) {
      // attach userId
      if (session.user) {
        (session.user as any).id = user.id;
      }
      return session;
    },
  },
  session: { strategy: "database" },
});

export { handler as GET, handler as POST };
