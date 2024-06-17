import express from 'express'
import userMilestoneController from '../controllers/userMilestoneController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const userMilestoneRouter = express.Router()

userMilestoneRouter.get(
    '/user-milestones/:id',
    authMiddleware,
    userMilestoneController.getMilestoneDetail
)
userMilestoneRouter.post(
    '/user-milestones',
    authMiddleware,
    userMilestoneController.createNewMilestone
)

export default userMilestoneRouter
