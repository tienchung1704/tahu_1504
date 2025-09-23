import { Button } from "@/components/ui/button";
import { useModal } from "../hooks/user-model-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const PaymentPageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const user = useUser();
  const isModalOpen = isOpen && type === "paymentPage";
  const onClick = async () => {
    try{
    const res = await axios.post("/api/checkout", {
      plan: data.paymentSelect,
      userId: user?.user?.id,
    });
          if (res.data.url) {
        // Redirect sang Stripe Checkout
        window.location.href = res.data.url;
      }
    }   catch(err){
      console.error(err);
    }

  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-zinc-700 dark:text-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-left font-bold">
            Choosing payment method
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500"></DialogDescription>
        </DialogHeader>
        <div className="items-center px-6 pb-6">
          <Button onClick={() => onClick()}>Stripe</Button>
        </div>
        <DialogFooter className="bg-gray-100 dark:bg-zinc-700 dark:text-white w-full items-center align-middle grid  px-6 py-4"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPageModal;
