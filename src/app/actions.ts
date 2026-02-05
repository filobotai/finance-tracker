"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Currency, TxType } from "@prisma/client";

function centsFromInput(value: string): number {
  // Accept: "12", "12.3", "12,30"
  const normalized = value.trim().replace(",", ".");
  const num = Number(normalized);
  if (!Number.isFinite(num)) throw new Error("Invalid amount");
  return Math.round(num * 100);
}

async function getOrCreateDemoUser() {
  const email = (process.env.DEMO_EMAIL || "demo@finance-tracker.local").toLowerCase();
  return prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Demo" },
  });
}

export async function createTransaction(formData: FormData) {
  const user = await getOrCreateDemoUser();

  const amount = String(formData.get("amount") || "");
  const description = String(formData.get("description") || "").trim();
  const typeRaw = String(formData.get("type") || "EXPENSE");
  const category = String(formData.get("category") || "").trim();
  const payment = String(formData.get("payment") || "").trim();

  if (!description) throw new Error("Description is required");

  const type = typeRaw === "INCOME" ? TxType.INCOME : TxType.EXPENSE;

  await prisma.transaction.create({
    data: {
      userId: user.id,
      amountCents: centsFromInput(amount),
      currency: Currency.EUR,
      type,
      description,
      category: category || null,
      payment: payment || null,
    },
  });

  revalidatePath("/");
}

export async function deleteTransaction(id: string) {
  await prisma.transaction.delete({ where: { id } });
  revalidatePath("/");
}
