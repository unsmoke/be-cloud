import express from 'express'
import userController from '../controllers/userController.mjs'
import userValidations from '../validations/userValidations.mjs'
import isAuthenticated from '../middlewares/isAuthenticated.mjs'

const userRouter = express.Router()

userRouter.post('/login', userValidations.validateLogin, userController.login)
userRouter.post('/register', userValidations.validateRegister, userController.register)
userRouter.post('/refresh', userController.refresh);

// Test middleware
userRouter.get('/protected-route', isAuthenticated, (req, res) => {
  res.json({ message: 'Welcome, authenticated user!' });
});

export default userRouter



