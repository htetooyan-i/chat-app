import express from "express";
import { authMiddleware } from "../middleware/auth";
import {
    GetMessagesForChannel,
    CreateMessage,
    EditMessage,
    DeleteMessage, SignUpload
} from "../controllers/message.controller";

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, GetMessagesForChannel);
router.post('/', authMiddleware, CreateMessage);
router.patch('/:messageId', authMiddleware, EditMessage);
router.delete('/:messageId', authMiddleware, DeleteMessage);

router.get('/attachments/sign-upload', authMiddleware, SignUpload);

export default router;
