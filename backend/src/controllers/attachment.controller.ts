import { Request, Response } from 'express';
import cloudinary from '../lib/cloudinary';

import AttachmentService from '../services/attachment.service';
import { AttachmentErrorCode, AttachmentErrorMessage } from '../errors/attachmentErrors';

export async function DeleteAttachment(req: Request, res: Response) {
    try {
        const { attachmentId, publicId, resourceType } = req.body;

        if (!publicId || !resourceType) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Failed to delete attachment',
                error: {
                    code: AttachmentErrorCode.MISSING_PARAMETERS,
                    detail: AttachmentErrorMessage[AttachmentErrorCode.MISSING_PARAMETERS]
                }
            });
        }

        await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType.toLowerCase() as 'image' | 'video' | 'raw'
        });

        if (attachmentId) {
            await AttachmentService.deleteAttachment(attachmentId);
        }

        return res.status(200).json({
            success: true,
            data: null,
            message: 'Attachment deleted successfully',
            error: null
        });

    } catch (error: any) {
        console.error('Delete attachment error:', error);
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to delete attachment',
            error: {
                code: AttachmentErrorCode.INTERNAL_SERVER_ERROR,
                detail: AttachmentErrorMessage[AttachmentErrorCode.INTERNAL_SERVER_ERROR]
            }
        });
    }
}

export async function SignUpload(req: Request, res: Response) {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder: 'chat-media', type: 'upload' },
        // @ts-ignore
        process.env.CLOUDINARY_API_SECRET
    );
    res.status(200).json({
        success: true,
        data: {
            timestamp,
            signature,
        },
        message: 'Upload signature generated successfully',
        error: null
    });
}

export async function GetAttachmentsForChannel(req: Request, res: Response) {
    const { channelId } = req.params;
    const { page, limit } = req.query;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 20;

    if (!channelId) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Failed to get attachments',
            error: {
                code: AttachmentErrorCode.MISSING_PARAMETERS,
                detail: AttachmentErrorMessage[AttachmentErrorCode.MISSING_PARAMETERS]
            }
        });
    }

    try {
        const {attachments, totalImages, totalRaws, page: currentPage} = await AttachmentService.getAttachmentForChannel(Number(channelId), pageNumber, limitNumber);
        
        return res.status(200).json({
            success: true,
            data: {
                items: attachments,
                pagination: {
                    page: currentPage,
                    limit: limitNumber,
                    totalImages,
                    totalRaws,
                }
            },
            message: 'Attachments retrieved successfully',
            error: null
        });
    } catch (error: any) {
        console.error('Get attachments error:', error);
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Failed to get attachments',
            error: {
                code: AttachmentErrorCode.INTERNAL_SERVER_ERROR,
                detail: AttachmentErrorMessage[AttachmentErrorCode.INTERNAL_SERVER_ERROR]
            }
        });
    }
}