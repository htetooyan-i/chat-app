import { Message } from "./Message";
import { Server } from "./Server";
import { ApiResponse } from "./ApiResponse";

export type Channel = {
    id: number;
    name: string;
    serverId: number;
    type: "text" | "voice";
    createdAt: string;

    server?: Server;
    messages?: Message[];
}

export type GetChannelsResponse = ApiResponse<Channel[]>;
export type CreateChannelResponse = ApiResponse<Channel>;