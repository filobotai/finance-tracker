import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const now = await prisma.$queryRaw`select now() as now`;
  return NextResponse.json({ ok: true, now });
}
