import { NextFunction, Response } from 'express'
import { RequestExt } from '../interfaces/request-ext'
import { verifyToken } from '../utils/jwt.handler'
import boom from '@hapi/boom'

const checkJwt = (req: RequestExt, res: Response, next: NextFunction): void => {
  try {
    const jwtByUser = req.headers.authorization ?? ''

    const jwt = jwtByUser.split(' ').pop()

    if (!jwt) return next(boom.unauthorized('Invalid token'))

    const isUser = verifyToken(`${jwt}`) as { id: string }

    req.user = isUser

    return next()
  } catch (error) {
    // return next(boom.badRequest('Invalid session'))
    return next(error)
  }
}

export default checkJwt
