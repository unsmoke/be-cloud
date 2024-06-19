import express from 'express'
import userMilestoneController from '../controllers/userMilestoneController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const userMilestoneRouter = express.Router()

userMilestoneRouter.get(
    '/user-milestones/:user_id',
    authMiddleware,
    userMilestoneController.getMilestoneDetail
)
userMilestoneRouter.get('/user-milestones', authMiddleware, userMilestoneController.getAllMilestone)

export default userMilestoneRouter
