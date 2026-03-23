import { prisma } from '../lib/prisma';

import { AttachmentType } from '@prisma/client';

class AttachmentService {
    static async deleteAttachment(attachmentId: number) {
        await prisma.attachment.delete({
            where: { id: attachmentId }
        });
    }

    static async getAttachmentForChannel(
    channelId: number,
    page: number = 1,
    limit: number = 20,
    ) {
        const [attachments, totalImages, totalRaws] = await Promise.all([
            prisma.attachment.findMany({
            where: { channelId },
            take: limit,
            skip: (page - 1) * limit,
            orderBy: { id: "desc" }
            }),

            prisma.attachment.count({
            where: { channelId, type: 'IMAGE' }
            }),

            prisma.attachment.count({
                where: { channelId, type: 'RAW' }
             })
        ]);

        return {
            attachments,
            totalImages,
            totalRaws,
            page
        };
    }
}

export default AttachmentService;