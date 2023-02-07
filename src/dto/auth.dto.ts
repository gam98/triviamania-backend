import { User } from '../interfaces/user.interface'

export interface RegisterUserDto extends Pick<User, 'email'> {
  passwordHash: string
}

export type UserDto = Readonly<Omit<User, 'password' | 'recoveryToken'>>

export interface UpdateUserDto
  extends Partial<Omit<User, 'createdAt' | 'updatedAt' | '_id'>> {}
