import "reflect-metadata"
import { DataSource } from "typeorm"
import { Account } from "./entity/Account"
import { Transaction } from "./entity/Transaction"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "ng-challenge",
    synchronize: true,
    logging: true,
    entities: [Account, User, Transaction],
    migrations: [],
    subscribers: [],
})