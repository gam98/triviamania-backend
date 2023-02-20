import { NextFunction, Response } from 'express'
import { config } from '../config'
import { RequestExt } from '../interfaces/request-ext'
import { asyncHandler } from '../middlewares/async.handler'
import { getResults, saveResult } from '../services/result.service'

const saveResultCtrl = asyncHandler(async ({ user, body }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const response = await saveResult({ userId: user?.id, ...body })

  res.status(201).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Result saved succesfull',
    response
  })
})

const getResultsCtrl = asyncHandler(async ({ user, query }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const { limit = 1, offset = 0 } = query

  const options = {
    limit: +limit <= 0 ? 10 : +limit,
    offset: +offset < 0 ? 0 : +offset
  }

  const { docs, prevPage, nextPage, offset: offsetResponse } = await getResults(options, user?.id)

  const prevOffset = offsetResponse - 10
  const nextOffset = offsetResponse + 10

  res.status(200).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Results',
    response: {
      content: docs,
      prevPage: `${prevPage === null ? null : config.backendUrl + '/api/v1/results?limit=' + options.limit + '&offset=' + prevOffset}`,
      nextPage: `${nextPage === null ? null : config.backendUrl + '/api/v1/results?limit=' + options.limit + '&offset=' + nextOffset}`
    }
  })
})

export { saveResultCtrl, getResultsCtrl }
