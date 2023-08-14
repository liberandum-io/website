import { NextResponse } from "next/server";
import { processors } from "./[processor]/[species]/route";

export async function GET() {
  return NextResponse.json({
    ok: true,
    processors: Object.keys(processors),
  });
}