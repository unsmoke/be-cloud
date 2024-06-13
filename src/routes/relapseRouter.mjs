import express from 'express'
import relapseController from '../controllers/relapseController.mjs'

const relapseRotuer = express.Router()

relapseRotuer.post('/relapse', relapseController.postRelapse)

export default relapseRotuer
