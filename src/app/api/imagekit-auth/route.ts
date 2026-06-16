import { getUploadAuthParams } from "@imagekit/next/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    });
  } catch (err) {
    console.error("ImageKit Auth error:", err);
    return NextResponse.json(
      { error: "Failed to get auth params" },
      { status: 500 },
    );
  }
}
