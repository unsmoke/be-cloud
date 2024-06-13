import express from 'express'
import userMilestoneController from '../controllers/userMilestoneController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const userMilestoneRouter = express.Router()

userMilestoneRouter.get(
    '/user-milestones',
    authMiddleware,
    userMilestoneController.getAllMilestones
)
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
userMilestoneRouter.put(
    '/user-milestones/:id',
    authMiddleware,
    userMilestoneController.updateMilestone
)
userMilestoneRouter.delete(
    '/user-milestones/:id',
    authMiddleware,
    userMilestoneController.deleteMilestone
)

export default userMilestoneRouter
