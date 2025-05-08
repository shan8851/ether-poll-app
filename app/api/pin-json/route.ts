import { pinata } from '@/app/lib/pinata/pinata';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { cid } = await pinata.upload.public.json(body);
    const url = await pinata.gateways.public.convert(cid);

    return NextResponse.json({ cid, url }, { status: 201 });
  } catch (error) {
    console.error('[pin-json]', error);
    return NextResponse.json({ error: 'Failed to pin JSON' }, { status: 500 });
  }
}
