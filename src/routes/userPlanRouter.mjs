import express from 'express';
import userPlanController from '../controllers/userPlanController.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';
import { validateUserPlanUpdate } from '../validations/userPlanValidations.mjs';

const userPlanRouter = express.Router();

userPlanRouter.get('/user-plan', authMiddleware, userPlanController.getUserActivePlan);
userPlanRouter.get('/user-plan/all', authMiddleware, userPlanController.getAllPlan);
userPlanRouter.put('/user-plan', authMiddleware, validateUserPlanUpdate, userPlanController.updateActivePlan);

export default userPlanRouter;
