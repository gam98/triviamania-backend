import { NextFunction, Request, Response } from 'express'
import { RequestExt } from '../interfaces/request-ext'
import jwt, { Secret } from 'jsonwebtoken'
import { config } from '../config'

const validateToken = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).json({
      error: true,
      message: 'A token is required for this process'
    })
  }

  return verifyToken(token, req as RequestExt, res, next)
}

const verifyToken = (token: string, req: RequestExt, res: Response, next: NextFunction): any => {
  try {
    const decoded = jwt.verify(`${token}`, config.jwtSecret as Secret) as { id: string }

    req.user = decoded

    return next()
  } catch ({ message, name }) {
    return res.status(403).json({
      error: true,
      message,
      type: name
    })
  }
}

export default validateToken
