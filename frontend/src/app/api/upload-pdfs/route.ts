import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { tmpdir } from "os";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const DATA_DIR = path.join(process.cwd(), "data", "samples");

export async function POST(request: Request) {
  const form = await request.formData();
  const files = form.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No se recibieron archivos" }, { status: 400 });
  }

  // Guarda cada PDF en tmp y después cópialo a data/samples
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    for (const f of files) {
      const buf = Buffer.from(await f.arrayBuffer());
      await fs.writeFile(path.join(DATA_DIR, (f as any).name), buf);
    }

    // Invoca tu script de rebuild
    await execAsync(`python ../scripts/load_pdfs.py --input ${DATA_DIR} --reset`, {
      cwd: process.cwd(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Falló la indexación" }, { status: 500 });
  }
}
