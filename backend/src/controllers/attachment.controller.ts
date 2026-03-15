import { Request, Response } from 'express';
import cloudinary from '../lib/cloudinary';

import AttachmentService from '../services/attachment.service';

export async function DeleteAttachment(req: Request, res: Response) {
    try {
        const { attachmentId, publicId, resourceType } = req.body;

        if (!publicId || !resourceType) {
            return res.status(400).json({ error: 'publicId and resourceType are required' });
        }
        console.log('Deleting from Cloudinary:', { publicId, resourceType });
        await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType.toLowerCase() as 'image' | 'video' | 'raw'
        });

        if (attachmentId) {
            await AttachmentService.deleteAttachment(attachmentId);
        }

        res.json({ success: true });
    } catch (error: any) {
        console.error('Delete attachment error:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function SignUpload(req: Request, res: Response) {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder: 'chat-media' },
        // @ts-ignore
        process.env.CLOUDINARY_API_SECRET
    );
    res.json({ timestamp, signature });
}
