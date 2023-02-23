import { User } from '../interfaces/user.interface'

export interface RegisterUserDto extends Pick<User, 'email'> {
  passwordHash: string
}

export type RegisterUserBySocialMediaDto = Pick<User, 'email' | 'password' | 'idProvider' | 'provider' | 'recoveryToken'>

export type UserDto = Readonly<Omit<User, 'password' | 'recoveryToken' | 'idProvider' | 'provider'>>

export interface UpdateUserDto
  extends Partial<Omit<User, 'createdAt' | 'updatedAt' | '_id'>> {}
