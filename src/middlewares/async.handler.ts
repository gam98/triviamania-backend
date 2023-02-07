import { NextFunction, Request, Response } from 'express'

const asyncHandler = (fn: any) => async (req: Request, res: Response, next: NextFunction) =>
  await Promise.resolve(fn(req, res, next)).catch(next)

export { asyncHandler }
