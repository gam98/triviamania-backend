import Joi from 'joi'
import { CATEGORIES } from '../enums/categories'
import { DIFFICULTY } from '../enums/difficulty'

const score = Joi.string()
const correctAnswers = Joi.number()
const incorrectAnswers = Joi.number()
const numberOfQuestions = Joi.number()
const categories = Joi.array().items(Joi.string().valid(
  CATEGORIES.ARTS_AND_LITERATURE,
  CATEGORIES.FILM_AND_TV,
  CATEGORIES.FOOD_AND_DRINK,
  CATEGORIES.GENERAL_KNOWLEDGE,
  CATEGORIES.GEOGRAPHY,
  CATEGORIES.HISTORY,
  CATEGORIES.MUSIC,
  CATEGORIES.SCIENCE,
  CATEGORIES.SOCIETY_AND_CULTURE,
  CATEGORIES.SPORT_AND_LEISURE
))
const difficulty = Joi.string().valid(
  DIFFICULTY.EASY,
  DIFFICULTY.MEDIUM,
  DIFFICULTY.HARD
)
const responseTime = Joi.string()

const saveResultSchema = Joi.object({
  score: score.required(),
  correctAnswers: correctAnswers.required(),
  incorrectAnswers: incorrectAnswers.required(),
  numberOfQuestions: numberOfQuestions.required(),
  categories: categories.required(),
  difficulty: difficulty.required(),
  responseTime: responseTime.required()
})

export {
  saveResultSchema
}
