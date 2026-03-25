import { Request, Response } from 'express';

import ChannelService from '../services/channel.service';
import { io } from "../server";
import { ChannelErrorCode, ChannelErrorMessage } from '../errors/channelErrors';
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';

// Controller function to create a new channel for a server (FUTURE: Currently everyone can create channels, I will add permissions later)
export async function createNewChannelForServer(req: Request, res: Response) {
    const { serverId } = req.params;
    const { name } = req.body;
    try {
        const channel = await ChannelService.createChannel(Number(serverId), name);
        io.to(`server-${serverId}`).emit("receivedNewChannel", channel);
        return sendSuccess(res, 201, "Channel created successfully", channel);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return sendError(
                res,
                409,
                ChannelErrorCode.EXIST_CHANNEL,
                "Channel with the same name already exists in this server.",
            );
        }
        return sendErrorFromUnknown(res, error, ChannelErrorCode.INTERNAL_SERVER_ERROR, "An error occurred while creating the channel.", 500);
    }
}

export async function getChannelsForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    try {
        const channels = await ChannelService.getChannelsForServer(Number(serverId));
        return sendSuccess(res, 200, "Channels fetched successfully", channels);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, ChannelErrorCode.INTERNAL_SERVER_ERROR, "An error occurred while fetching channels.", 400);
    }
}

export async function getChannelById(req: Request, res: Response) {
    const { channelId } = req.params;

    try {
        const channel = await ChannelService.getChannelById(Number(channelId));
        if (!channel) {
            return sendError(res, 404, ChannelErrorCode.CHANNEL_NOT_FOUND, "Channel not found");
        }
        return sendSuccess(res, 200, "Channel fetched successfully", channel);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, ChannelErrorCode.INTERNAL_SERVER_ERROR, "An error occurred while fetching the channel.", 400);
    }
}

export async function updateChannelName(req: Request, res: Response) {
    const { channelId } = req.params;
    const userId = req.user?.userId;
    const { newName } = req.body;

    if (!userId) {
        return sendError(res, 401, ChannelErrorCode.UNAUTHORIZED, ChannelErrorMessage[ChannelErrorCode.UNAUTHORIZED]);
    }

    try {
        const updatedChannel = await ChannelService.updateChannelName(Number(channelId), newName);
        io.to(`server-${updatedChannel.serverId}`).emit("channelUpdated", updatedChannel);
        return sendSuccess(res, 200, "Channel name updated successfully", updatedChannel);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, ChannelErrorCode.INTERNAL_SERVER_ERROR, "An error occurred while updating the channel name.", 400);
    }
}

export async function deleteChannel(req: Request, res: Response) {
    const { serverId, channelId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return sendError(res, 401, ChannelErrorCode.UNAUTHORIZED, ChannelErrorMessage[ChannelErrorCode.UNAUTHORIZED]);
    }

    try {
        await ChannelService.deleteChannel(Number(channelId), userId);
        io.to(`server-${serverId}`).emit("channelDeleted", Number(channelId));
        return sendSuccess(res, 200, "Channel deleted successfully", null);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, ChannelErrorCode.INTERNAL_SERVER_ERROR, "An error occurred while deleting the channel.", 400);
    }
}


