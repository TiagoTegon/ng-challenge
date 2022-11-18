import { createDatabase } from "typeorm-extension"
import { AppDataSource } from "../data-source"

export const connectDB = async () => {
  await createDatabase({ ifNotExist: true })
  AppDataSource.initialize().then(() => {
    console.log('Started database connection')
  }).catch(() => {
    console.log('Error on start database connection')
  })
}