import express from 'express'
import locationController from '../controllers/locationController.mjs'

const locationRouter = express.Router()

locationRouter.get('/location/province', locationController.getAllProvince)

locationRouter.get('/location/city/:province_id', locationController.getCityByProvince)

export default locationRouter
