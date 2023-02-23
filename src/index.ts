import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'
import morgan from 'morgan'
import passport from 'passport'
import { config } from './config'
import { connection } from './config/db'
import routerApi from './routes/index'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'
import { useGoogleStrategy } from './middlewares/authProvider.handler'

void connection()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(cookie())

app.use(passport.initialize())

passport.use(useGoogleStrategy())

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(config.port, () =>
  console.log(`Listening: ${config.backendUrl}:${config.port} - 🚀`)
)
