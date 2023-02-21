import { Router } from 'express'
import { changePasswordCtrl, deleteUserCtrl } from '../controllers/user.controller'
import validateToken from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import { changePasswordInSessionUserSchema } from '../schemas/user.schema'

const router = Router()

router.patch(
  '/change-password',
  validateToken,
  validatorHandler(changePasswordInSessionUserSchema, 'body'),
  changePasswordCtrl
)

router.delete(
  '/',
  validateToken,
  deleteUserCtrl
)

export default router
