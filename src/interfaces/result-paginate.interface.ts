import { Document } from 'mongoose'
import { Result } from './result.interface'

export interface IResultDocument extends Document, Result {}
