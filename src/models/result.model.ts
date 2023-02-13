import { Schema, model, PaginateModel } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { CATEGORIES } from '../enums/categories'
import { DIFFICULTY } from '../enums/difficulty'
import { IResultDocument } from '../interfaces/result-paginate.interface'
import { Result } from '../interfaces/result.interface'

const ResultSchema = new Schema<Result>(
  {
    userId: { type: String },
    score: { type: String },
    correctAnswers: { type: Number },
    incorrectAnswers: { type: Number },
    numberOfQuestions: { type: Number },
    categories: [{ type: String, enum: CATEGORIES }],
    difficulty: { type: String, enum: DIFFICULTY },
    responseTime: { type: String }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

ResultSchema.plugin(mongoosePaginate)

const ResultModel = model<IResultDocument, PaginateModel<IResultDocument>>('results', ResultSchema)

export default ResultModel
