import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import logger from "morgan"

import { connectDB } from "./config/db"
import { accountRouter } from "./routes/accountRoutes"
import { userRouter } from "./routes/userRoutes"

export const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))

connectDB()

app.use('/account', accountRouter)
app.use('/user', userRouter)