import express from 'express'
import tokenController from '../controllers/tokenController.mjs'

const tokenRouter = express.Router()

tokenRouter.post('/refresh', tokenController.refresh)

export default tokenRouter
