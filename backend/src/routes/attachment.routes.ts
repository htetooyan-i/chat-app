import express from 'express';
import { authMiddleware } from '../middleware/auth';

import { 
    SignUpload,
    DeleteAttachment,
    GetAttachmentsForChannel
} from '../controllers/attachment.controller';

const router = express.Router({ mergeParams: true });


router.get('/sign-upload', authMiddleware, SignUpload);
router.get('/', authMiddleware, GetAttachmentsForChannel);
router.delete('/', authMiddleware, DeleteAttachment);

export default router;