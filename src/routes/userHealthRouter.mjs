import express from 'express';
import userHealthController from '../controllers/userHealthController.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';
import { validateUserHealth, validateUserHealthParams } from '../validations/userHealthValidations.mjs';

const userHealthRouter = express.Router();

userHealthRouter.get('/health', authMiddleware, userHealthController.getUserHealthDetail);
// userHealthRouter.get('/health/all', authMiddleware, userHealthController.getAllUserHealth);
userHealthRouter.post('/health', authMiddleware, validateUserHealth, userHealthController.createUserHealth);
userHealthRouter.put('/health/:user_id', authMiddleware, validateUserHealthParams, validateUserHealth, userHealthController.updateUserHealth);
userHealthRouter.delete('/health/:user_id', authMiddleware, validateUserHealthParams, userHealthController.deleteUserHealth);

export default userHealthRouter;
