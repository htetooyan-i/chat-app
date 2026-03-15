import { prisma } from '../lib/prisma';

class AttachmentService {
    static async deleteAttachment(attachmentId: number) {
        await prisma.attachment.delete({
            where: { id: attachmentId }
        });
    }
}

export default AttachmentService;