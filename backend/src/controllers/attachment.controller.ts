import { Request, Response } from 'express';
import cloudinary from '../lib/cloudinary';

import AttachmentService from '../services/attachment.service';
import { AttachmentErrorCode, AttachmentErrorMessage } from '../errors/attachmentErrors';
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';

export async function DeleteAttachment(req: Request, res: Response) {
    try {
        const { attachmentId, publicId, resourceType } = req.body;

        if (!publicId || !resourceType) {
            return sendError(
                res,
                400,
                AttachmentErrorCode.MISSING_PARAMETERS,
                AttachmentErrorMessage[AttachmentErrorCode.MISSING_PARAMETERS],
            );
        }

        await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType.toLowerCase() as 'image' | 'video' | 'raw'
        });

        if (attachmentId) {
            await AttachmentService.deleteAttachment(attachmentId);
        }

        return sendSuccess(res, 200, 'Attachment deleted successfully', null);

    } catch (error: any) {
        console.error('Delete attachment error:', error);
        return sendErrorFromUnknown(
            res,
            error,
            AttachmentErrorCode.INTERNAL_SERVER_ERROR,
            AttachmentErrorMessage[AttachmentErrorCode.INTERNAL_SERVER_ERROR],
            500,
        );
    }
}

export async function SignUpload(req: Request, res: Response) {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder: 'chat-media', type: 'upload' },
        // @ts-ignore
        process.env.CLOUDINARY_API_SECRET
    );
    return sendSuccess(
        res,
        200,
        'Upload signature generated successfully',
        {
            timestamp,
            signature,
        },
    );
}

export async function GetAttachmentsForChannel(req: Request, res: Response) {
    const { channelId } = req.params;
    const { page, limit } = req.query;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 20;

    if (!channelId) {
        return sendError(
            res,
            400,
            AttachmentErrorCode.MISSING_PARAMETERS,
            AttachmentErrorMessage[AttachmentErrorCode.MISSING_PARAMETERS],
        );
    }

    try {
        const {attachments, totalImages, totalRaws, page: currentPage} = await AttachmentService.getAttachmentForChannel(Number(channelId), pageNumber, limitNumber);
        
        return sendSuccess(res, 200, 'Attachments retrieved successfully', {
            items: attachments,
            pagination: {
                page: currentPage,
                limit: limitNumber,
                totalImages,
                totalRaws,
            }
        });
    } catch (error: any) {
        console.error('Get attachments error:', error);
        return sendErrorFromUnknown(
            res,
            error,
            AttachmentErrorCode.INTERNAL_SERVER_ERROR,
            AttachmentErrorMessage[AttachmentErrorCode.INTERNAL_SERVER_ERROR],
            500,
        );
    }
}