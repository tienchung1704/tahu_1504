"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "../hooks/user-model-store";

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

export function SelectInterestsModal() {
    const [selected, setSelected] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const { hobyyUser, setHobbyUser, onOpen, onClose, isOpen, type } = useModal();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    if (!isOpen || type !== "selectInterests") return null;

    const toggleInterest = (interest: string) => {
        setSelected((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest]
        );
    };

    const handleNext = () => {
        setHobbyUser(selected);
        onOpen("getPublicServer");
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">
                        Select your Hobby
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-2 mt-4">
                    {interestsList.map((interest, index) => (
                        <Button
                            key={interest}
                            type="button"
                            variant={selected.includes(interest) ? "default" : "outline"}
                            onClick={() => toggleInterest(interest)}
                            className="flex items-center gap-2 dark:text-shadow-zinc-300"
                        >
                            <span>{iconInterestList[index]}</span>
                            {interest}
                        </Button>
                    ))}
                </div>

                <Button
                    onClick={handleNext}
                    disabled={selected.length === 0}
                    className="w-full mt-6 bg-purple-600 text-white"
                >
                    Next Step
                </Button>
            </DialogContent>
        </Dialog>
    );
}
