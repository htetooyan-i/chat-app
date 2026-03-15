import express from 'express';
import { authMiddleware } from '../middleware/auth';

import { 
    SignUpload,
    DeleteAttachment
} from '../controllers/attachment.controller';

const router = express.Router({ mergeParams: true });


router.get('/sign-upload', authMiddleware, SignUpload);
router.delete('/', authMiddleware, DeleteAttachment);

export default router;