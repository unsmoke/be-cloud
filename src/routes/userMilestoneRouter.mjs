import express from 'express'
import userMilestoneController from '../controllers/userMilestoneController.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const userMilestoneRouter = express.Router()

userMilestoneRouter.get(
    '/user-milestones/:userId',
    authMiddleware,
    userMilestoneController.getMilestoneDetail
)

export default userMilestoneRouter
