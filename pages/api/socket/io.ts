import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIO } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    io.on("connection", (socket) => {
      console.log("✅ New client connected:", socket.id);

      socket.on("ping-check", (callback: () => void) => {
        callback();
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
