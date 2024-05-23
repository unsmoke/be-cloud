import express from 'express'
import dummyController from '../controllers/dummyController.mjs'

const dummyRouter = express.Router()

dummyRouter.get('/test', dummyController.test)

export default dummyRouter
