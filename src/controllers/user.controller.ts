import boom from '@hapi/boom'
import { NextFunction, Response } from 'express'
import { encrypt, verify } from '../utils/bcrypt.handler'
import { RequestExt } from '../interfaces/request-ext'
import {
  deleteOneUser,
  findOneUserById,
  updateOneUser
} from '../services/user.service'
import { asyncHandler } from '../middlewares/async.handler'

const changePasswordCtrl = asyncHandler(async ({ user, body }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const userId = user?.id

  const { oldPassword, newPassword } = body

  const userFound = await findOneUserById(userId)

  if (userFound === null) throw boom.badRequest('User not found')

  const isCorrect = await verify(oldPassword, userFound?.password)

  if (!isCorrect) throw boom.unauthorized()

  const passwordHash = await encrypt(newPassword)

  const response = await updateOneUser(userId, { password: passwordHash })

  if (response === null) throw boom.clientTimeout('Something went wrong')

  res.status(200).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Password successfully updated',
    response
  })
})

const deleteUserCtrl = asyncHandler(async ({ user }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const userId = user?.id

  await deleteOneUser(userId)

  res.status(200).send({
    statusCode: res.statusCode,
    error: false,
    message: 'User successfully deleted'
  })
})

export { changePasswordCtrl, deleteUserCtrl }
