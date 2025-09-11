"use client";

import * as z from "zod";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/hooks/user-model-store";
import { FileUpload } from "@/components/file-upload";


const formSchema = z.object({
  fileUrl: z.string().min(1, { message: "Attactment is required." }),
});

export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === "messageFile";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.post(url, { ...values, content: values.fileUrl });
      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {}
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="!fixed !left-1/2 !top-1/2 !translate-x-[-50%] !translate-y-[-50%] sm:max-w-xl sm:rounded-lg  bg-white text-black">
        <DialogHeader className="pt-8 px-6 ">
          <DialogTitle className="text-2xl text-center font-bold">
            Upload File
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                variant="primary"
                disabled={isLoading}
                type="submit"
                className="w-full"
              >
                Upload
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
