import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from '~/config/connectDB'
import rootRouter from '~/router'

require('dotenv').config()

const START_SERVER = () => {
    const app = express()
    app.use(cors({
        origin: process.env.FRONTEND_DOMAIN,
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization']
    }))
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))

    const hostname = process.env.HOST_NAME || 'localhost'
    const port = process.env.PORT || 6969

    app.use('/api', rootRouter)

    app.listen(port, hostname, () => {
        console.log(`Server listening on port: ${port}`)
        console.log('-------------------------------')
    })
}

connectDB()
    .then(() => {
        console.log('Connected to database!')
        console.log('-------------------------------')
    })
    .then(() => START_SERVER())
    .catch(err => {
        console.error(err)
        process.exit(1)
    })