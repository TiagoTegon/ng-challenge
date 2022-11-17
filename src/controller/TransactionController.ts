import { AppDataSource } from "../data-source"
import { Transaction } from "../entity/Transaction"

export class TransactionController {
  async createTransaction(req, res) {
    const { accountId } = req.params
    const newTrasaction = { ...req.body, debitedAccountId: Number(accountId), creditedAccountId: Number(accountId)}
    try {
      const newTrasactionCreate = await AppDataSource.manager.save(Transaction, newTrasaction)
      return res.status(200).json(newTrasactionCreate)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async getAllTransactionByAccount(req, res) {
    try {
      const allTransaction = await AppDataSource.manager.find(Transaction)
      return res.status(200).json(allTransaction)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}