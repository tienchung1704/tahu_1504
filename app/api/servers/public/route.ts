import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { hobby, userId } = await req.json();
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    console.log("Hobby IDs:111111112211111111", hobby);
    const servers = await db.server.findMany({
      where: {
        isPublic: true,
        hobby: { in: hobby },
        NOT: {
          OR: [
            { profile: { userId } }, 
            { members: { some: { profileId: profile.id } } },
          ],
        },
      },
      include: {
        profile: true,
        members: {
          select: { profileId: true },
        },
      },
    });

    return NextResponse.json(servers);
  } catch (err) {
    console.error("Error fetching public servers:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
