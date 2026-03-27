import { Server, Socket } from 'socket.io';

import PresenceService from '../services/presence.service';

const hasActiveSocketsForUser = (io: Server, userId: number) => {
	for (const connectedSocket of io.sockets.sockets.values()) {
		if (connectedSocket.data.userId === userId) {
			return true;
		}
	}

	return false;
};

export const registerPresenceEvents = async (io: Server, socket: Socket) => {
	const userId = socket.data.userId as number;

	try {
		const presence = await PresenceService.togglePresence(userId, true);
		io.emit('presenceUpdated', {
			userId,
			status: presence.status,
			updatedAt: presence.updatedAt,
		});
	} catch (error) {
		console.error('Failed to set user online:', error);
	}

	socket.on('disconnect', async () => {
		// Wait one tick so socket.io can remove the current socket from the active list.
		await new Promise((resolve) => setTimeout(resolve, 0));

		if (hasActiveSocketsForUser(io, userId)) {
			return;
		}

		try {
			const presence = await PresenceService.togglePresence(userId, false);
			io.emit('presenceUpdated', {
				userId,
				status: presence.status,
				updatedAt: presence.updatedAt,
			});
		} catch (error) {
			console.error('Failed to set user offline:', error);
		}
	});
};
