import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "lamora_session";
const SESSION_DAYS = 30;
const MAX_AGE = 60 * 60 * 24 * SESSION_DAYS;

export interface SessionPayload {
  userId: string;
  /** Epoch ms em que a sessão expira. */
  expiresAt: number;
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET não definido — configure em .env para assinar sessões.",
    );
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function verifySignature(value: string, signature: string): boolean {
  const expected = Buffer.from(sign(value), "hex");
  const actual = Buffer.from(signature, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function createSession(userId: string): Promise<void> {
  const payload: SessionPayload = {
    userId,
    expiresAt: Date.now() + MAX_AGE * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const value = `${encoded}.${sign(encoded)}`;

  const store = await cookies();
  store.set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function readSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const cookie = store.get(SESSION_COOKIE);
  if (!cookie) return null;

  const [encoded, signature] = cookie.value.split(".");
  if (!encoded || !signature) return null;
  if (!verifySignature(encoded, signature)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as SessionPayload;
  } catch {
    return null;
  }

  if (
    typeof payload.userId !== "string" ||
    typeof payload.expiresAt !== "number" ||
    payload.expiresAt < Date.now()
  ) {
    return null;
  }

  return payload;
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
