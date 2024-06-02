import express from 'express'
import userController from '../controllers/userController.mjs'
import userValidations from '../validations/userValidations.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

const userRouter = express.Router()

userRouter.post('/login', userValidations.validateLogin, userController.login)
userRouter.post('/register', userValidations.validateRegister, userController.register)

// Test middleware
userRouter.get('/protected-route', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome, authenticated user!' })
})

export default userRouter
