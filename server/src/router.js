import { Router } from 'express';
import authController from './controllers/authController.js';
import motorcycleController from './controllers/motorcycleController.js';

const router = Router();

router.use('/auth', authController);
router.use('/motorcycles', motorcycleController);

export default router;