import express from 'express'
import ctrl from './controller'
import middleware from './middleware'

const userRouter = express.Router()

userRouter.post('/check-email', ctrl.checkEmailExists)
userRouter.post('/register', ctrl.register)

userRouter.post('/login', ctrl.login)
userRouter.get('/login-with-google', middleware.loginWithGoogle, ctrl.loginWithGoogle)

userRouter.get('/logout', ctrl.logout)

userRouter.get('/fetch-data', middleware.fetchData, ctrl.fetchData)

export default userRouter