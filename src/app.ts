import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import * as logger from "morgan"

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