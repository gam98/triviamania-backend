import { CATEGORIES } from '../enums/categories'
import { DIFFICULTY } from '../enums/difficulty'

export interface Result {
  userId: string
  score: string
  correctAnswers: number
  incorrectAnswers: number
  numberOfQuestions: number
  categories: CATEGORIES[]
  difficulty: DIFFICULTY
  responseTime: string
}
