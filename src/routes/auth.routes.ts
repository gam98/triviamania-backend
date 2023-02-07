import { Router } from 'express'
import {
  changePassword,
  login,
  recoveryPassword,
  register
} from '../controllers/auth.controller'
import validatorHandler from '../middlewares/validator.handler'
import {
  changePasswordUserSchema,
  createUserSchema,
  loginUserSchema,
  recoveryUserSchema
} from '../schemas/user.schema'

const router = Router()

router.post('/register', validatorHandler(createUserSchema, 'body'), register)

router.post('/login', validatorHandler(loginUserSchema, 'body'), login)

router.post(
  '/recovery',
  validatorHandler(recoveryUserSchema, 'body'),
  recoveryPassword
)

router.post(
  '/change-password',
  validatorHandler(changePasswordUserSchema, 'body'),
  changePassword
)

export default router
