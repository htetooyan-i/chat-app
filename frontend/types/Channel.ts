import { Message } from "./Message";
import { Server } from "./Server";

export type Channel = {
    id: number;
    name: string;
    serverId: number;
    type: "text" | "voice";
    createdAt: string;

    server?: Server;
    messages?: Message[];
}