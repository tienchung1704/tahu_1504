"use client";

import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/hooks/user-model-store";

const iconInterestList = [
  "🎮",
  "🎵",
  "💻",
  "🎬",
  "🏀",
  "🎨",
  "📚",
  "📱",
  "✈️",
  "🍔",
];
const interestsList = [
  "Gaming",
  "Music",
  "Programming",
  "Movies",
  "Sports",
  "Anime",
  "Books",
  "Technology",
  "Travel",
  "Food",
];
export function PublicServerModal() {
  const [selected, setSelected] = useState<string | null>(null);

  const { isOpen, onClose, type, setHobbyServer, onOpen  } = useModal();
  const isModalOpen = isOpen && type === "publicServer";


  const handleClose = () => {
    onClose();
  };
  const toggleInterest = (interest: string) => {
    setSelected((prev) => {
      const newValue = prev === interest ? null : interest;
      setHobbyServer(newValue === null ? undefined : newValue); 
      return newValue;
    });
    setTimeout(()=>{
        onClose();
        onOpen("createPublicServer")
    }, 1500)
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Select your Hobby
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            This will help us to customize your server
          </DialogDescription>
        </DialogHeader>
          <form  className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="grid grid-cols-1 gap-2 mt-4">
                {interestsList.map((interest, index) => (
                  <Button
                    key={interest}
                    type="button"
                    variant={selected === interest ? "default" : "outline"}
                    onClick={() => toggleInterest(interest)}
                    className="flex items-center gap-2 dark:bg-zinc-200 dark:text-shadow-zinc-700"
                  >
                    <span>{iconInterestList[index]}</span>
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        <DialogFooter className="bg-gray-100 w-full items-center align-middle grid  px-6 py-4">
          <p className="text-xs">
            {" "}
            By successfully creating a public server, you agree to our public{" "}
            <span className="text-blue-500 cursor-pointer">Discord terms.</span>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
