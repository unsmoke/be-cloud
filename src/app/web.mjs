import express from 'express'
import cors from 'cors'
import {errorMiddleware} from '../middlewares/errorMiddleware.mjs'
import {checkDBMiddleware} from '../middlewares/checkDBMiddleware.mjs'
import {errors} from '../utils/messageError.mjs'
import {responseError} from '../utils/responseAPI.mjs'
import userRouter from '../routes/userRouter.mjs'
import bodyParser from 'body-parser'

export const web = express()
web.use(express.json())
web.use(cors())
web.use(checkDBMiddleware)
web.use(bodyParser.urlencoded({ extended: true }))

web.use('/api/v1', userRouter)

web.use(errorMiddleware)

// invalid api route
web.use((req, res) => {
    return res
        .status(errors.HTTP.CODE.UNAUTHORIZED)
        .send(
            responseError(
                errors.HTTP.CODE.UNAUTHORIZED,
                errors.HTTP.STATUS.UNAUTHORIZED,
                errors.HTTP.MESSAGE.UNAUTHORIZED
            )
        )
        .end()
})
