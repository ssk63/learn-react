import { Router } from 'express';
import personalVoiceRoutes from './personalVoice.routes';

const router = Router();

// Personal voice routes
router.use('/personal-voices', personalVoiceRoutes);

export default router; 