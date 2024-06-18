import express from 'express'
import userController from '../controllers/userController.mjs'
import userValidations from '../validations/userValidations.mjs'
import authMiddleware from '../middlewares/authMiddleware.mjs'

import multer from 'multer'

const userRouter = express.Router()
const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // 1 MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Only JPEG and PNG files are allowed')
            error.code = 'LIMIT_FILE_TYPES'
            return cb(error, false)
        }
        cb(null, true)
    },
})

userRouter.post('/login', userValidations.validateLogin, userController.login)
userRouter.post('/register', userValidations.validateRegister, userController.register)

userRouter.get('/user', authMiddleware, userController.getUser)
userRouter.put(
    '/user/profile',
    authMiddleware,
    upload.single('file'),
    userController.updateUserProfile
)
userRouter.post('/user/verify', userController.verifyEmail)
userRouter.post('/user/forgot-password', userController.forgotPassword)
userRouter.post('/user/reset-password', userController.resetPassword)

// Test middleware
userRouter.get('/protected-route', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome, authenticated user!' })
})

export default userRouter
