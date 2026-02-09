import express from 'express';
import 'dotenv/config';

import authRoutes from './auth.routes';
import usersRoutes from './users.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

export default router;


