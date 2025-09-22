"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/components/hooks/user-model-store";
import { Button } from "../ui/button";

interface Server {
    id: string;
    name: string;
    imageUrl: string;
    hobby: string;
    profile: {
        id: string;
        name: string;
        imageUrl: string;
    };
    _count?: {
        members: number;
    };
}

export function GetPublicServerModal() {
    const { isOpen,onOpen, onClose, type, hobyyUser } = useModal();
    const isModalOpen = isOpen && type === "getPublicServer";

    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState(false);

    const handleClose = () => onClose();

    useEffect(() => {
        if (!hobyyUser || hobyyUser.length === 0) return;

        const fetchServers = async () => {
            setLoading(true);
            try {
                const res = await axios.post("/api/servers/public", {
                    params: { hobbies: hobyyUser.join(",") },
                });
                setServers(res.data);
                console.log("Fetched servers:", res.data);
            } catch (error) {
                console.error("Error fetching servers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServers();
    }, [hobyyUser]);

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-left font-bold">
                        Public Servers
                    </DialogTitle>
                    <DialogDescription className="text-left text-zinc-500">
                        That you may like based on your interests
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-8 px-6 py-4">
                    {loading ? (
                        <p>Loading servers...</p>
                    ) : servers.length === 0 ? (
                        <p>No public servers match your interests.</p>
                    ) : (
                        <div className="grid grid-cols-1  gap-4 mt-4">
                            {servers.map((server) => (
                                <div
                                    key={server.id}
                                    className="mb-4 h-full w-full rounded hover:bg-gray-200 cursor-pointer flex items-center gap-4"
                                >
                                    <img
                                        src={server.imageUrl}
                                        alt={server.profile.name}
                                        className="w-13 h-13 rounded-full object-cover ml-3"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{server.name}    </h3>
                                        <span className=" text-sm text-right text-zinc-500">{server._count?.members ?? 0} Members</span>
                                        <p className="text-sm text-zinc-500">Hobby: {server.hobby}</p>
                                        <p className="text-xs text-zinc-400">
                                            Created by: {server.profile.name}
                                        </p>
                                    </div>
                                    <Button
                                        className="ml-auto bg-indigo-300 text-zinc-700 mr-3"
                                        onClick={() => onOpen("joinServer")}
                                    >
                                        Joining
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <DialogFooter className="bg-gray-100 w-full items-center align-middle grid px-6 py-4">
                    <p className="text-xs">
                        By successfully joining a public server, you agree to our public{" "}
                        <span className="text-blue-500 cursor-pointer">Discord terms.</span>
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
