"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/hooks/user-model-store";
import { on } from "events";

const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required." }),
});

export function InitialModal() {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen, onClose } = useModal();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);

      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const onClick = () => {
    onClose();
    router.refresh();
    onOpen("joinServer");
  };
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[500px] bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 grid px-6">
              <Button
                className="bg-emerald-200 text-zinc-800 w-full dark:bg-emerald-200"
                disabled={isLoading}
                variant="secondary"
                onClick={() => onOpen("createStartServer")}
              >
                <div>
                  🛋️
                </div>
                Create My Own
              </Button>
              <Button
                className="bg-purple-300 text-zinc-800 w-full dark:bg-purple-300"
                disabled={isLoading}
                variant="secondary"
                onClick={() => onOpen("publicServer")}
              >
                <div>
                  🌎
                </div>
                Create for a club or community
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter className="bg-gray-100 w-full items-center align-middle grid  px-6 py-4">
          <p className="ml-35 text-sm">Or your already have a link</p>
          <Button
            className="bg-zinc-300 text-zinc-800 w-full dark:bg-zinc-200 mr-85"
            onClick={onClick}
            variant="secondary"
          >
            Join a Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
