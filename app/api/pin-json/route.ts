// app/api/pin-json/route.ts
import { pinata } from "@/app/lib/pinata";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";          // force Node (pinata relies on fs & Buffer)
export const dynamic = "force-dynamic";   // disable static caching

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // validate payload here (zod, yup, etc.) if you wish

    const { cid } = await pinata.upload.public.json(body);  // pins JSON :contentReference[oaicite:1]{index=1}
    const url = await pinata.gateways.public.convert(cid);  // nice https:// link

    return NextResponse.json({ cid, url }, { status: 201 });
  } catch (error) {
    console.error("[pin-json]", error);
    return NextResponse.json({ error: "Failed to pin JSON" }, { status: 500 });
  }
}
