import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { MemberRole } from "@/lib/generated/prisma/client";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSection } from "@/components/server/server-section";
import { ServerMember } from "@/components/server/server-member";
import { Diamond, DiamondPlus } from "lucide-react";
interface ServerSidebarProps {
  serverId: string;
}
export const ShowMemberChannel = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channels: { orderBy: { createdAt: "asc" } },
      members: {
        include: { profile: true },
        orderBy: { role: "asc" },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  // role của chính bạn
  const role = server.members.find((m) => m.profileId === profile.id)?.role;

  // tách admin và members (bao gồm cả bản thân)
  const admins = server.members.filter((m) => m.role === MemberRole.ADMIN);
  const members = server.members.filter((m) => m.role !== MemberRole.ADMIN);

  return (
    <div className="p-2 flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ScrollArea className="flex-1 px-3">
        {/* Section Admins */}
        {!!admins?.length && (
          <div className="mb-4">
            <div className="flex items-center">
              <ServerSection
                sectionType="members"
                role={role}
                label="Admins"
                server={server}
              />
              <p className="text-sm text-zinc-700 dark:text-zinc-400 ml-3 mb-0.5">
                -
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-400 ml-3 mb-0.5">
                {admins.length}
              </p>
            </div>
            {admins.map((admin) => (
              <div key={admin.id} className="flex items-center gap-2">
                <ServerMember member={admin} server={server} />
                {admin.profile.isPremium === true && (
                  <>
                    <DiamondPlus className="h-5 w-5 mb-1 r-4 cursor-pointer text-purple-400" />

                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Section Members */}
        {!!members?.length && (
          <div className="mb-2">
            <div className="flex items-center">
              <ServerSection
                sectionType="members"
                role={role}
                label="Members"
                server={server}
              />
              <p className="text-sm text-zinc-700 dark:text-zinc-400 ml-3 mb-0.5">
                -
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-400 ml-3 mb-0.5">
                {members.length}
              </p>
            </div>
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-2">
                <ServerMember member={member} server={server} />
                {member.profile.isPremium === true && (
                  <DiamondPlus className="h-5 w-5 mb-1 r-4 cursor-pointer text-purple-400" />
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
