import { RegisterUserBySocialMediaDto, RegisterUserDto, UpdateUserDto, UserDto } from '../dto/auth.dto'
import { User } from '../interfaces/user.interface'
import UserModel from '../models/user.model'

const registerNewUser = async ({ email, passwordHash }: RegisterUserDto): Promise<UserDto> => {
  const user: User = await UserModel.create({
    password: passwordHash,
    email,
    recoveryToken: null,
    idProvider: null,
    provider: null
  })

  const userRegistered: UserDto = {
    _id: user._id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  return userRegistered
}

const findOneUserByEmail = async (email: UserDto['email']): Promise<User | null> => {
  const userFound: User | null = await UserModel.findOne({ email })
  return userFound
}

const findOneUserById = async (_id: UserDto['_id']): Promise<User | null> => {
  const user = await UserModel.findById(_id)
  return user
}

const updateOneUser = async (_id: UserDto['_id'], data: UpdateUserDto): Promise<UserDto | null> => {
  const user: User | null = await UserModel.findByIdAndUpdate(_id, data, { new: true }).select('-password -recoveryToken')

  if (user === null) return null

  return user
}

const deleteOneUser = async (_id: UserDto['_id']): Promise<User | null> => {
  const userDeleted: User | null = await UserModel.findByIdAndDelete({ _id })
  return userDeleted
}

const findOneUserByProvider = async (data: any): Promise<User | null> => {
  const userFound: User | null = await UserModel.findOne(data)
  return userFound
}

const socialLogin = async (data: RegisterUserBySocialMediaDto): Promise<UserDto> => {
  const user: User = await UserModel.create(data)

  const userRegistered: UserDto = {
    _id: user._id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  return userRegistered
}

export {
  registerNewUser,
  findOneUserByEmail,
  findOneUserById,
  updateOneUser,
  deleteOneUser,
  findOneUserByProvider,
  socialLogin
}
