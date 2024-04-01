import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const data = await req.json();
  const toSave = JSON.stringify(data, null, 2);

  try {
    await fs.writeFile(filePath, toSave);
    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const data = await fs.readFile(filePath, "utf-8");
  return NextResponse.json(JSON.parse(data), { status: 200 });
}
