import express from 'express';
import 'dotenv/config';

import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import serverRoutes from './server.routes';
import channelRoutes from './channels.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/servers', serverRoutes);
router.use('/servers/:serverId/channels', channelRoutes);
router.use('/channels', channelRoutes);

export default router;


