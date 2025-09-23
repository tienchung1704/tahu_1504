"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const success = searchParams?.get("success");
    const userId = searchParams?.get("userId");

    if (success === "true" && userId) {
      axios
        .post("/api/verify-payment", { userId })
        .then(() => {
          toast.success("Payment successful!");
          router.push("/");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Payment failed!");
        });
    } else {
      toast.info("Payment canceled");
      router.push("/");
    }
  }, [searchParams, router]);

  return <p>Verifying payment...</p>;
}