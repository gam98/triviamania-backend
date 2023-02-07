import mongoose from 'mongoose'
import { config } from '.'

mongoose.set('strictQuery', true)

export const connection = async function (): Promise<void> {
  const conn = await mongoose.connect(
    `mongodb+srv://${config.dbUsername}:${config.dbPassword}@${config.dbHost}/${config.dbName}`
  )

  console.log('Mongo DB connected:', conn.connection.host)
}
