import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { hobby } = await req.json();
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const hobbyIds = hobby?.map((h: any) => h.id);

    const servers = await db.server.findMany({
      where: {
        isPublic: true,
        hobby: { in: hobbyIds },
      },
      include: {
        profile: true,
        _count: {
          select: { members: true },
        },
      },
    });
    return NextResponse.json(servers);
  } catch (err) {
    console.error("Error fetching public servers:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
