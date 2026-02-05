export function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export function parseAllowedEmails(): Set<string> {
  const raw = process.env.ALLOWED_EMAILS || "";
  return new Set(
    raw
      .split(/[;,\s]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}
