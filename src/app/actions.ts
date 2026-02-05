"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { Currency, TxType } from "@prisma/client";

function centsFromInput(value: string): number {
  // Accept: "12", "12.3", "12,30"
  const normalized = value.trim().replace(",", ".");
  const num = Number(normalized);
  if (!Number.isFinite(num)) throw new Error("Invalid amount");
  return Math.round(num * 100);
}

function dateFromDatetimeLocal(value: string): Date {
  // value like "2026-02-05T21:30" (no timezone) -> interpreted as local time
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date");
  return d;
}

async function requireUserId(): Promise<string> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) throw new Error("Not authenticated");
  return userId;
}

export async function createTransaction(formData: FormData) {
  const userId = await requireUserId();

  const amount = String(formData.get("amount") || "");
  const description = String(formData.get("description") || "").trim();
  const typeRaw = String(formData.get("type") || "EXPENSE");
  const category = String(formData.get("category") || "").trim();
  const payment = String(formData.get("payment") || "").trim();
  const occurredAtRaw = String(formData.get("occurredAt") || "").trim();

  if (!description) throw new Error("Description is required");

  const type = typeRaw === "INCOME" ? TxType.INCOME : TxType.EXPENSE;
  const occurredAt = occurredAtRaw ? dateFromDatetimeLocal(occurredAtRaw) : new Date();

  await prisma.transaction.create({
    data: {
      userId,
      amountCents: centsFromInput(amount),
      currency: Currency.EUR,
      type,
      description,
      category: category || null,
      payment: payment || null,
      occurredAt,
    },
  });

  revalidatePath("/");
}

export async function deleteTransaction(id: string) {
  const userId = await requireUserId();
  await prisma.transaction.deleteMany({ where: { id, userId } });
  revalidatePath("/");
}
