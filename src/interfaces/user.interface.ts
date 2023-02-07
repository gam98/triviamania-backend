import Base from './base.interface'

export interface User extends Base {
  email: string
  password: string
  recoveryToken: string | null
}
