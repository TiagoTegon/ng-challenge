import { createConnection } from "typeorm"

export const connectDB = async () => {
  const connection = await createConnection()
  console.log(`App connected to DB ${connection.options.database}`)

  process.on('SIGINT', () => {
    connection.close().then(() => console.log('Closed DB connection'))
  })
}