import { NextResponse } from "next/server";

// Auth is not wired yet (the Prisma schema in this repo does not include NextAuth models).
// Leaving this route as a friendly stub so deployments work out of the box.

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Auth is not configured in this project yet. This endpoint is a stub.",
    },
    { status: 501 },
  );
}

export async function POST() {
  return GET();
}
