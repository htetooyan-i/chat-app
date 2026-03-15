import express from 'express';
import 'dotenv/config';

import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import serverRoutes from './server.routes';
import serverMemberRoutes from './serverMember.routes';
import channelRoutes from './channel.routes';
import serverInvitesRoutes from './serverInvite.routes';
import banRoutes from './ban.routes';
import messageRoutes from './message.routes';
import reactionRoutes from './reaction.routes';
import attachmentRoutes from './attachment.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/servers', serverRoutes);
router.use('/servers/:serverId', serverMemberRoutes);
router.use('/servers/:serverId/channels', channelRoutes);
router.use('/channels', channelRoutes);
router.use('/servers/:serverId/invites', serverInvitesRoutes);
router.use('/invites', serverInvitesRoutes);
router.use('/servers/:serverId/bans', banRoutes);
router.use('/messages/:messageId/reactions', reactionRoutes);
router.use('/messages/attachments', attachmentRoutes);
router.use('/channels/:channelId/messages', messageRoutes);
router.use('/messages', messageRoutes);

export default router;


