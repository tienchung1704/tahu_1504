import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import z from "zod";
import { useModal } from "../hooks/user-model-store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
const formSchema = z.object({
    link: z.string().min(1, { message: "Server link is required." }),
});

const JoinServerModal = () => {
    const { isOpen, onClose, type, onOpen } = useModal();
    const isModalOpen = isOpen && type === "joinServer";

    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
        },
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = new URL(values.link);
            const inviteRoute = url.pathname.substring(url.pathname.indexOf("/invite"));
            router.push(inviteRoute);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };
    const handleClose = () => {
        form.reset();
        onClose();
    };
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Join the Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Paste the invite link to join an existing server
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                            </div>
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Server Link
                                        </FormLabel>
                                        <div className="flex space-between gap-2">
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    placeholder="https://discord.gg/aBcdxYz23"
                                                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 w-[88%]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-[60px]"
                                                variant="primary"
                                            >
                                                Join
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
                <DialogFooter className="bg-gray-100 w-full items-center align-middle grid  px-6 py-4">
                    <p className="ml-27 text-sm ">Or explore our public Server below</p>
                    <Button
                        className="bg-zinc-500 text-zinc-700 w-full dark:bg-zinc-300 dark:text-zinc-500 mr-20"
                        variant="secondary"
                        onClick={() => {
                            onOpen("selectInterests");
                        }}
                    >
                        Or select your interests and join our public Server
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>

    );
};

export default JoinServerModal;
