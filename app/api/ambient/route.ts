import { createReadStream, statSync } from "fs";
import { Readable } from "stream";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

/** Kept outside /public — only streamed via this route (still fetchable; not a direct static URL). */
const AUDIO_PATH = path.join(
  process.cwd(),
  "assets",
  "ShortLord beat - Viby 95bpm.mp3",
);

function allowedRequest(req: NextRequest): boolean {
  const host = req.headers.get("host") ?? "";
  const origin = req.headers.get("origin") ?? "";
  const referer = req.headers.get("referer") ?? "";
  const secFetchSite = req.headers.get("sec-fetch-site") ?? "";

  // Same-origin navigations / media element loads
  if (secFetchSite === "same-origin" || secFetchSite === "same-site") return true;
  if (origin && host && origin.includes(host)) return true;
  if (referer && host && referer.includes(host)) return true;

  // Local / preview without referer (Safari quirks)
  if (
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.includes("vercel.app")
  ) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  if (!allowedRequest(req)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  let size: number;
  try {
    size = statSync(AUDIO_PATH).size;
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }

  const range = req.headers.get("range");
  const commonHeaders: Record<string, string> = {
    "Content-Type": "audio/mpeg",
    "Content-Disposition": "inline",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "private, max-age=3600",
    "Accept-Ranges": "bytes",
    // Discourage casual hotlinking / embedding elsewhere
    "X-Robots-Tag": "noindex, nofollow",
  };

  if (range) {
    const m = /bytes=(\d+)-(\d*)/.exec(range);
    if (!m) {
      return new NextResponse("Invalid range", { status: 416 });
    }
    const start = Number(m[1]);
    const end = m[2] ? Number(m[2]) : size - 1;
    if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= size) {
      return new NextResponse("Invalid range", {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }

    const nodeStream = createReadStream(AUDIO_PATH, { start, end });
    const webStream = Readable.toWeb(nodeStream) as ReadableStream;

    return new NextResponse(webStream, {
      status: 206,
      headers: {
        ...commonHeaders,
        "Content-Length": String(end - start + 1),
        "Content-Range": `bytes ${start}-${end}/${size}`,
      },
    });
  }

  const nodeStream = createReadStream(AUDIO_PATH);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      ...commonHeaders,
      "Content-Length": String(size),
    },
  });
}
