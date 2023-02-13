import { Router } from 'express'
import { getResultsCtrl, saveResultCtrl } from '../controllers/result.controller'
import checkJwt from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import { saveResultSchema } from '../schemas/result.schema'

const router = Router()

router.post(
  '/save-result',
  checkJwt,
  validatorHandler(saveResultSchema, 'body'),
  saveResultCtrl
)

router.get(
  '/',
  checkJwt,
  getResultsCtrl
)

export default router
