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
import Image from "next/image";

const PaymentPageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const user = useUser();
  const isModalOpen = isOpen && type === "paymentPage";
  const onClick = async () => {
    try {
      const res = await axios.post("/api/checkout/stripe", {
        plan: data.paymentSelect,
        userId: user?.user?.id,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white w-[340px] dark:bg-zinc-800 dark:text-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-0.5xl text-left text-white font-bold">
            Choosing payment method
          </DialogTitle>
          <DialogDescription className="text-left text-white">
            Select payment type
          </DialogDescription>
        </DialogHeader>
        <div className="items-center flex flex-col-2 gap-2 px-6 pb-6">
          <Button
            className="ml-4 w-[120px] p-2 bg-white dark:bg-white text-zinc-800"
            variant="outline"
            onClick={() => onClick()}
          >
            <Image
              src="/stripe.png"
              alt="Stripe"
              width={30}
              height={30}
              className="mr-2 border-radius: 20%"
            />
            Stripe
          </Button>
          <Button
            className="ml-6 w-[120px] p-2 bg-white dark:bg-white text-zinc-800"
            variant="outline"
            onClick={() => {}}
          >
            <Image
              src="/momo.png"
              alt="Stripe"
              width={30}
              height={30}
              className="mr-2 border-radius: 20%"
            />
            Momo
          </Button>
        </div>
        <Button
          className="ml-10  w-[120px] p-2 bg-white dark:bg-white text-zinc-800"
          variant="outline"
          onClick={async () => {
            const res = await axios.post("/api/checkout/vnpay", {
              plan: data.paymentSelect,
              userId: user?.user?.id,
            });
            if (res.data.url) {
              window.location.href = res.data.url;
            }
          }}
        >
          <Image
            src="/vnpay.png"
            alt="Stripe"
            width={30}
            height={30}
            className="mr-2 border-radius: 20%"
          />
          VNPay
        </Button>
        <DialogFooter className="bg-gray-100 dark:bg-zinc-800 dark:text-white w-full items-center align-middle grid  px-6 py-4"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPageModal;
