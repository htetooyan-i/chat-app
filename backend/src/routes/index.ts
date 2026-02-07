import express from 'express';
import 'dotenv/config';

import authRoutes from './auth.routes';

const router = express.Router();

router.use('/auth', authRoutes);

export default router;


