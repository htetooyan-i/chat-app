import express from "express";
import { authMiddleware } from "../middleware/auth";
import {
    GetMessagesForChannel,
    CreateMessage,
    EditMessage,
    DeleteMessage
} from "../controllers/message.controller";

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, GetMessagesForChannel);
router.post('/', authMiddleware, CreateMessage);
router.patch('/:messageId', authMiddleware, EditMessage);
router.delete('/:messageId', authMiddleware, DeleteMessage);


export default router;
