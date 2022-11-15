import { AppDataSource } from "./data-source"
import { Account } from "./entity/Account"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const account = new Account()
    account.balance = 100.00
    await AppDataSource.manager.save(account)
    console.log("Saved a new account with id: " + account.id)

    console.log("Loading accounts from the database...")
    const accounts = await AppDataSource.manager.find(Account)
    console.log("Loaded accounts: ", accounts)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
