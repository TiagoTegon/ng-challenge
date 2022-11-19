import { AppDataSource } from "../data-source"
import { Account } from "../entity/Account"
import { Transaction } from "../entity/Transaction"
import { User } from "../entity/User"

export class TransactionController {

  async createTransaction(req, res) {
    const { creditedUser, value } = req.body
    const { username } = req.params
    console.log(value)
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const debitedUser = await AppDataSource.manager.findOne(User, {
        where: { username: username },
        relations: { account: true }
      })
      if(debitedUser.username === creditedUser) throw new Error(`Operation denied`)
      const accountCreditedUser = await AppDataSource.manager.findOne(User, {
        where: { username: creditedUser },
        relations: { account: true }
      })
      if(accountCreditedUser === null) throw new Error(`User ${creditedUser} not found`)
      const accountDebitedUser = debitedUser.account
      if(accountDebitedUser.balance < value) throw new Error(`Insufficient value`)
      
      const newTransactionCreate = new Transaction()
      newTransactionCreate.debitedAccount = accountDebitedUser
      newTransactionCreate.creditedAccount = accountCreditedUser.account
      newTransactionCreate.value = value
      await queryRunner.manager.save(newTransactionCreate)

      const accountDebitedId = Number(accountDebitedUser.id)
      const accountDebitedBalance = Number(accountDebitedUser.balance) - Number(value)
      await AppDataSource.manager.update(Account, accountDebitedId, { balance: accountDebitedBalance })

      const accountCreditedId = Number(accountCreditedUser.account.id)
      const accountCreditedBalance = accountCreditedUser.account.balance + value
      await AppDataSource.manager.update(Account, accountCreditedId, { balance: accountCreditedBalance })
      await queryRunner.commitTransaction()
      return res.status(200).json({ message: `Successful cash-in for ${creditedUser}`})
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return res.status(500).json(error.message)
    }
  }

  async getTransactionByUser(req, res) {
    const { username } = req.params
    try {
      const findUser = await AppDataSource.manager.findOne(User, {
        where: { username: username },
        relations: { account: true }
      })
      const accountId = findUser.account
      const allUserTransaction = await AppDataSource.manager.find(Transaction, {
        where: [{ 
          debitedAccount: accountId 
        }, {
          creditedAccount: accountId
        }],
        relations: { creditedAccount: true, debitedAccount: true }, 
      })
      return res.status(200).json(allUserTransaction)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}