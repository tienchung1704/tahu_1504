"use client";

import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { EditServerModal } from "@/components/modals/sever-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { EditChanelModal } from "@/components/modals/edit-channel-modal";
import { MessageFileModal } from "@/components/modals/message-file";
import { DeleteMessageModal } from "@/components/modals/delete-message";
import JoinServerModal from "../modals/jion-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log("ModalProvider mounted");
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  console.log("Render modals...");

  return (
    <>
      <CreateServerModal />
      <JoinServerModal />
      <InviteModal />
      <MembersModal />
      <EditServerModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChanelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
