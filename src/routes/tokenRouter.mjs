import express from 'express'
import tokenController from '../controllers/tokenController.mjs'
import authMiddleware from "../middlewares/authMiddleware.mjs";

const tokenRouter = express.Router()

tokenRouter.post('/refresh', authMiddleware, tokenController.refresh)

export default tokenRouter
