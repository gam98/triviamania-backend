import { NextFunction, Request, Response } from 'express'
import {
  registerNewUser,
  findOneUserByEmail,
  updateOneUser,
  findOneUserById,
  findOneUserByProvider,
  socialLogin
} from '../services/user.service'
import { encrypt, verify } from '../utils/bcrypt.handler'
import { generateToken, verifyToken } from '../utils/jwt.handler'
import boom from '@hapi/boom'
import { config } from '../config'
import { sendEmail } from '../utils/email.handler'
import { UserDto } from '../dto/auth.dto'
import { asyncHandler } from '../middlewares/async.handler'
import { convertDaysInMiliseconds } from '../utils/convertDaysToMiliseconds.handler'
import { RequestProvider } from '../interfaces/request-provider'
import { v4 as uuidv4 } from 'uuid'
import { RequestExt } from '../interfaces/request-ext'

const register = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = body

  const user = await findOneUserByEmail(email)

  if (user) throw boom.forbidden('Already registered')

  const passwordHash = await encrypt(password)

  const response = await registerNewUser({ email, passwordHash })

  res.status(201).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Registration successful',
    response
  })
})

const login = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = body

  const user = await findOneUserByEmail(email)

  if (!user) throw boom.notFound('User not found')

  const isCorrect = await verify(password, user.password)

  if (!isCorrect) throw boom.unauthorized()

  const token = generateToken({ id: user._id })

  res.status(200).cookie('token', token, {
    httpOnly: true,
    secure: true, // just false in development, in production or browser change to true
    sameSite: 'none',
    maxAge: convertDaysInMiliseconds(7)
  }).json({
    statusCode: res.statusCode,
    error: false,
    message: 'Login successful',
    response: {
      user: {
        id: user._id,
        email: user.email
      }
    }
  })
})

const recoveryPassword = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = body

  const user = await findOneUserByEmail(email)

  if (!user) throw boom.notFound('User not found')

  const payload = { sub: user._id }

  const token = generateToken(payload, '15min')

  const link = `${config.frontendUrl}/recovery?token=${token}`

  await updateOneUser(user._id, { recoveryToken: token })

  const mail = {
    from: config.smtpEmail,
    to: `${user.email}`,
    subject: 'Email to recover password',
    html: `<b>Click <a href="${link}" target="_blank">here</a> to redirect the page</b>`
  }

  const response = await sendEmail(mail)

  res.status(200).send({
    statusCode: 200,
    message: response
  })
})

const changePassword = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { token, newPassword } = body

  const payload = verifyToken(token)

  const { sub } = payload

  const user = await findOneUserById(sub as UserDto['_id'])

  if (user?.recoveryToken === null) throw boom.unauthorized()

  const passwordHash = await encrypt(newPassword)

  await updateOneUser(sub as UserDto['_id'], {
    recoveryToken: null,
    password: passwordHash
  })

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Password changed successfully'
  })
})

const validate = asyncHandler(async ({ user }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const userFound = await findOneUserById(user?.id)

  if (!userFound) throw boom.unauthorized()

  res.status(200).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Session validated',
    response: {
      user: {
        id: userFound._id,
        email: userFound.email
      }
    }
  })
})

const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).clearCookie('token', {
    expires: new Date(),
    httpOnly: true,
    sameSite: 'none',
    secure: true
  }).json({
    statusCode: res.statusCode,
    error: false,
    message: 'Successfully logout '
  })
})

const provider = asyncHandler(async (req: RequestProvider, res: Response, next: NextFunction) => {
  const profile = req.user.profile

  if (profile === null) throw boom.badGateway()

  const userFound = await findOneUserByProvider({ provider: profile.provider, idProvider: profile.id })

  if (userFound) {
    const token = generateToken({ id: userFound._id })
    return res.cookie('token', token, {
      httpOnly: true,
      secure: true, // just false in development, in production or browser change to true
      sameSite: 'none',
      maxAge: convertDaysInMiliseconds(7)
    }).redirect('http://localhost:5173')
  }

  if (profile._json.email === undefined) throw boom.badRequest()

  const user = {
    email: profile._json.email,
    password: uuidv4(),
    idProvider: profile.id,
    provider: profile.provider,
    recoveryToken: null
  }

  const userCreated = await socialLogin(user)

  const token = generateToken({ id: userCreated._id })

  res.status(200).cookie('token', token, {
    httpOnly: true,
    secure: true, // just false in development, in production or browser change to true
    sameSite: 'none',
    maxAge: convertDaysInMiliseconds(7)
  }).redirect('http://localhost:5173')
})

export { register, login, recoveryPassword, changePassword, validate, logout, provider }
