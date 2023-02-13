import { Router, Application } from 'express'
import authRouter from './auth.routes'
import userRouter from './user.routes'
import resultRouter from './result.routes'

const routerApi = (app: Application): void => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
  router.use('/users', userRouter)
  router.use('/results', resultRouter)
}

export default routerApi
