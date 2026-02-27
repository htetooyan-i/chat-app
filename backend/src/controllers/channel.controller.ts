import { Request, Response } from 'express';

import ChannelService from '../services/channel.service';
import AuthService from '../services/auth.service';

// Controller function to create a new channel for a server (NOTE: Currently everyone can create channels, I will add permissions later)
export async function createNewChannelForServer(req: Request, res: Response) {
    const { serverId } = req.params;
    const { name } = req.body;
    try {
        const channel = await ChannelService.createChannel(Number(serverId), name);
        res.status(201).json(channel);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "A channel with this name already exists in this server." });
        }
        if (error.message === 'Channel name is required') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error." });
    }
}

export async function getChannelsForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    try {
        const channels = await ChannelService.getChannelsForServer(Number(serverId));
        res.status(200).json(channels);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getChannelById(req: Request, res: Response) {
    const { channelId } = req.params;

    try {
        const channel = await ChannelService.getChannelById(Number(channelId));
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' });
        }
        res.status(200).json(channel);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateChannelName(req: Request, res: Response) {
    const { channelId } = req.params;
    const userId = req.user?.userId;
    const { newName } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const updatedChannel = await ChannelService.updateChannelName(Number(channelId), newName);
        res.status(200).json(updatedChannel);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteChannel(req: Request, res: Response) {
    const { channelId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        await ChannelService.deleteChannel(Number(channelId), userId);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}


