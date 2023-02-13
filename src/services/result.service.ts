import { Result } from '../interfaces/result.interface'
import { Options } from '../interfaces/options.interface'
import ResultModel from '../models/result.model'
import { IResultDocument } from '../interfaces/result-paginate.interface'
import { PaginateResult, Types } from 'mongoose'

const saveResult = async (data: Result): Promise<Result> => {
  const result = await ResultModel.create({ ...data })
  return result
}

const getResults = async (options: Options, userId: Result['userId']): Promise<PaginateResult<IResultDocument & { _id: Types.ObjectId }>> => {
  const results = await ResultModel.paginate({ userId }, options)
  return results
}

export { saveResult, getResults }
