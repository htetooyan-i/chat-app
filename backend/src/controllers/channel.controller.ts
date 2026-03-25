import { Request, Response } from 'express';

import ChannelService from '../services/channel.service';
import { io } from "../server";
import { ChannelErrorCode, ChannelErrorMessage } from '../errors/channelErrors';

// Controller function to create a new channel for a server (FUTURE: Currently everyone can create channels, I will add permissions later)
export async function createNewChannelForServer(req: Request, res: Response) {
    const { serverId } = req.params;
    const { name } = req.body;
    try {
        const channel = await ChannelService.createChannel(Number(serverId), name);
        io.to(`server-${serverId}`).emit("receivedNewChannel", channel);
        res.status(201).json({
            success: true,
            message: "Channel created successfully",
            data: channel,
            error: null
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: "Channel with the same name already exists in this server.",
                data: null,
                error: {
                    code: (error as Error).message,
                    message: ChannelErrorMessage[(error as Error).message as keyof typeof ChannelErrorMessage]
                }
            });
        }
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the channel.",
            data: null,
            error: {
                code: (error as Error).message,
                message: ChannelErrorMessage[(error as Error).message as keyof typeof ChannelErrorMessage] || 'Unknown error'
            }   
        });
    }
}

export async function getChannelsForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    try {
        const channels = await ChannelService.getChannelsForServer(Number(serverId));
        res.status(200).json({
            success: true,
            message: "Channels fetched successfully",
            data: channels,
            error: null
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "An error occurred while fetching channels.",
            data: null,
            error: {
                code: (error as Error).message,
                message: ChannelErrorMessage[(error as Error).message as keyof typeof ChannelErrorMessage] || 'Unknown error'
            }
        });
    }
}

export async function getChannelById(req: Request, res: Response) {
    const { channelId } = req.params;

    try {
        const channel = await ChannelService.getChannelById(Number(channelId));
        if (!channel) {
            return res.status(404).json({
                success: false,
                message: "Channel not found",
                data: null,
                error: null
            });
        }
        res.status(200).json({
            success: true,
            message: "Channel fetched successfully",
            data: channel,
            error: null
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "An error occurred while fetching the channel.",
            data: null,
            error: {
                code: (error as Error).message,
                message: ChannelErrorMessage[(error as Error).message as keyof typeof ChannelErrorMessage] || 'Unknown error'
            }
        });
    }
}

export async function updateChannelName(req: Request, res: Response) {
    const { channelId } = req.params;
    const userId = req.user?.userId;
    const { newName } = req.body;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            data: null,
            error: {
                code: ChannelErrorCode.UNAUTHORIZED,
                message: ChannelErrorMessage[ChannelErrorCode.UNAUTHORIZED]
            }
        });
    }

    try {
        const updatedChannel = await ChannelService.updateChannelName(Number(channelId), newName);
        io.to(`server-${updatedChannel.serverId}`).emit("channelUpdated", updatedChannel);
        res.status(200).json({
            success: true,
            message: "Channel name updated successfully",
            data: updatedChannel,
            error: null
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "An error occurred while updating the channel name.",
            data: null,
            error: {
                code: (error as Error).message,
                message: ChannelErrorMessage[(error as Error).message as keyof typeof ChannelErrorMessage] || 'Unknown error'
            }
        });
    }
}

export async function deleteChannel(req: Request, res: Response) {
    const { serverId, channelId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            data: null,
            error: {
                code: ChannelErrorCode.UNAUTHORIZED,
                message: ChannelErrorMessage[ChannelErrorCode.UNAUTHORIZED]
            }
        });
    }

    try {
        await ChannelService.deleteChannel(Number(channelId), userId);
        io.to(`server-${serverId}`).emit("channelDeleted", Number(channelId));
        res.status(200).json({
            success: true,
            message: "Channel deleted successfully",
            data: null,
            error: null
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "An error occurred while deleting the channel.",
            data: null,
            error: {
                code: (error as Error).message,
                message: ChannelErrorMessage[(error as Error).message as keyof typeof ChannelErrorMessage] || 'Unknown error'
            }
        });
    }
}


