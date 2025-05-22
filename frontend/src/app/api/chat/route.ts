import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy que redirige la pregunta al backend FastAPI
 * y devuelve { answer: string }.
 */
export async function POST(req: NextRequest) {
  const { question } = (await req.json()) as { question: string };

  const endpoint = process.env.NEXT_PUBLIC_CHAT_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_CHAT_ENDPOINT missing" },
      { status: 500 },
    );
  }

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!resp.ok) {
    return NextResponse.json(
      { error: "Backend error", detail: await resp.text() },
      { status: 500 },
    );
  }

  const { answer } = (await resp.json()) as { answer: string };
  return NextResponse.json({ answer });
}
