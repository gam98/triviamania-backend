import { Router } from 'express'
import { changePasswordCtrl, deleteUserCtrl } from '../controllers/user.controller'
import checkJwt from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import { changePasswordInSessionUserSchema } from '../schemas/user.schema'

const router = Router()

router.patch(
  '/change-password',
  checkJwt,
  validatorHandler(changePasswordInSessionUserSchema, 'body'),
  changePasswordCtrl
)

router.delete(
  '/',
  checkJwt,
  deleteUserCtrl
)

export default router
