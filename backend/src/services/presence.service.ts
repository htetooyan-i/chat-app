import { prisma } from '../lib/prisma';

class PresenceService {
	static async togglePresence(userId: number, isOnline: boolean) {
		const status = isOnline ? 'online' : 'offline';

		return prisma.presence.upsert({
			where: { userId },
			update: { status },
			create: {
				userId,
				status,
			},
		});
	}
}

export default PresenceService;
