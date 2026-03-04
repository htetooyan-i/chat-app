import { Message } from "./Message";

export type Channel = {
    id: number;
    name: string;
    serverId: number;
    type: "text" | "voice";
    createdAt: string;

    server?: any;
    messages?: Message[];
}