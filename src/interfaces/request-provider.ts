import { Request } from 'express'
import { Profile } from 'passport-google-oauth20'

export interface RequestProvider extends Request {
  user: {
    profile: Profile
  }
}
