import Base from './base.interface'

export interface User extends Base {
  email: string
  password: string
  idProvider: string | null
  provider: string | null
  recoveryToken: string | null
}
