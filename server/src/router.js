import express from 'express'
import userRouter from './app/user/router'

const rootRouter = express.Router()

rootRouter.use('/user', userRouter)

export default rootRouter