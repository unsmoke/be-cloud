import express from 'express'
import testController from '../controllers/testController.mjs'

const testRouter = express.Router()

testRouter.get('/test', testController.test)

export default testRouter
