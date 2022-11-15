import "reflect-metadata"
import { DataSource } from "typeorm"
import { Account } from "./entity/Account"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "ng-challenge",
    synchronize: true,
    logging: false,
    entities: [Account],
    migrations: [],
    subscribers: [],
})
