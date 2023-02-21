import { Router } from 'express'
import { getResultsCtrl, saveResultCtrl } from '../controllers/result.controller'
import validateToken from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import { saveResultSchema } from '../schemas/result.schema'

const router = Router()

router.post(
  '/save-result',
  validateToken,
  validatorHandler(saveResultSchema, 'body'),
  saveResultCtrl
)

router.get(
  '/',
  validateToken,
  getResultsCtrl
)

export default router
