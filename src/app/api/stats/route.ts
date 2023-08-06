import { NextResponse } from 'next/server';
import getStats from './getStats';

export async function GET() {
  return NextResponse.json(await getStats());
}
