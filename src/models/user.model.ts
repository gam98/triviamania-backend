import { Schema, model } from 'mongoose'
import { User } from '../interfaces/user.interface'

const UserSchema = new Schema<User>(
  {
    email: { type: String },
    password: { type: String },
    idProvider: { type: String },
    provider: { type: String },
    recoveryToken: { type: String }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const UserModel = model('users', UserSchema)

export default UserModel
