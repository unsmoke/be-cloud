import express from 'express'
import cors from 'cors'
import { errorMiddleware } from '../middlewares/errorMiddleware.mjs'
import { checkDBMiddleware } from '../middlewares/checkDBMiddleware.mjs'
import { errors } from '../utils/messageError.mjs'
import { responseError } from '../utils/responseAPI.mjs'
import userRouter from '../routes/userRouter.mjs'
import bodyParser from 'body-parser'
import tokenRouter from '../routes/tokenRouter.mjs'
import shopItemRouter from '../routes/shopItemRouter.mjs'
import itemRouter from '../routes/itemRouter.mjs'
import userItemRouter from '../routes/userItemRouter.mjs'
import activityLogRouter from '../routes/activityLogRouter.mjs'
import breathingActivityRouter from '../routes/breathingActivityRouter.mjs'
import journalActivityRouter from '../routes/journalActivityRouter.mjs'
import userHealthRouter from '../routes/userHealthRouter.mjs'
import leaderboardRouter from '../routes/leaderboardRouter.mjs'
import locationRouter from '../routes/locationRouter.mjs'
import userPlanRouter from '../routes/userPlanRouter.mjs'
import userMilestoneRouter from '../routes/userMilestoneRouter.mjs'

export const web = express()
web.use(express.json())
web.use(cors())
web.use(checkDBMiddleware)
web.use(bodyParser.urlencoded({ extended: true }))

web.use('/api/v1', userRouter)
web.use('/api/v1', locationRouter)

web.use('/api/v1', tokenRouter)
web.use('/api/v1', shopItemRouter)
web.use('/api/v1', itemRouter)
web.use('/api/v1', userItemRouter)
web.use('/api/v1', userHealthRouter)
web.use('/api/v1', activityLogRouter)
web.use('/api/v1', breathingActivityRouter)
web.use('/api/v1', journalActivityRouter)
web.use('/api/v1', leaderboardRouter)
web.use('/api/v1', userPlanRouter)
web.use('/api/v1', userMilestoneRouter)

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
