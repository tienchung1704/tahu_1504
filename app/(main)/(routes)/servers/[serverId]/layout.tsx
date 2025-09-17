import { ShowMemberChannel } from "@/components/righsidebar/right-sidebar";
import { ServerSidebar } from "@/components/server/server-siderbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) => {
  const { serverId } = await params;
  const profile = await currentProfile();

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 ">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{profile && children}</main>
      <div className="hidden md:flex h-full w-60 flex-col fixed inset-y-0 right-0 border-l-1 my-12 ">
        <ShowMemberChannel serverId={serverId} />
      </div>
    </div>
  );
};

export default ServerIdLayout;
