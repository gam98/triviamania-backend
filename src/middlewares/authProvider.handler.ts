/* eslint-disable @typescript-eslint/no-non-null-assertion */
import googlePassport from 'passport-google-oauth20'
import { config } from '../config'
const GoogleStrategy = googlePassport.Strategy

const callbackUrl = (provider: string): string => {
  return `${config.callbackUrl}/api/v1/auth/${provider}/callback`
}

const getProfile = (accessToken: string, refreshToken: string, profile: googlePassport.Profile, done: googlePassport.VerifyCallback): void => {
  done(null, { profile })
}

const useGoogleStrategy = (): googlePassport.Strategy => {
  return new GoogleStrategy({
    clientID: config.oauthClientId!,
    clientSecret: config.oauthClientSecret!,
    callbackURL: callbackUrl('google')
  }, getProfile)
}

export { useGoogleStrategy }
