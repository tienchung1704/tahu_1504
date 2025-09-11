"use client";

import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
  const { isConnected, latency } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-600 text-white border-none"
      >
        Fallback: Polling every 1s
      </Badge>
    );
  }

  let bgColor = "bg-emerald-600"; // default xanh
  if (latency !== null) {
    if (latency > 200) bgColor = "bg-red-600";
    else if (latency > 100) bgColor = "bg-yellow-600";
  }

  return (
    <Badge variant="outline" className={`${bgColor} text-white border-none`}>
      {latency !== null ? `${latency}ms` : "Online"}
    </Badge>
  );
};