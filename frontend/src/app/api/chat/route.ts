import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/chat
 * Proxy hacia FastAPI. Devuelve { answer } o { error }.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const endpoint = process.env.NEXT_PUBLIC_CHAT_ENDPOINT;

  if (!endpoint) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_CHAT_ENDPOINT no configurado." },
      { status: 500 },
    );
  }

  let { question } = (await req.json()) as { question?: string };

  if (!question || typeof question !== "string") {
    return NextResponse.json(
      { error: "Falta el campo 'question'." },
      { status: 400 },
    );
  }

  const backendRes = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  //Si el backend está rate-limited 
  if (backendRes.status === 503) {
    const data = await backendRes.json();
    return NextResponse.json(data, { status: 503 });
  }

  if (!backendRes.ok) {
    const detail = await backendRes.text();
    return NextResponse.json(
      { error: "Error en el backend", detail },
      { status: 500 },
    );
  }

  const data = await backendRes.json(); 
  return NextResponse.json(data);
}
