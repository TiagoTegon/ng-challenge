import { Account } from "../entity/Account";
import { AppDataSource } from "../data-source";

export class AccountController {

  async createAccount(req, res) {
    try {
      const newAccountCreate = await AppDataSource.manager.save(Account, {})
      return res.status(200).json(newAccountCreate)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async getAllAccount(req, res) {
    try {
      const allAccounts = await AppDataSource.manager.find(Account)
      return res.status(200).json(allAccounts)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async getAccountById(req, res) {
    const { id } = req.params
    try {
      const findAccount = await AppDataSource.manager.findOneBy(Account, { id: Number(id) } )
      return res.status(200).json(findAccount)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async updateAccount(req, res) {
    const { id } = req.params
    const newBalance = req.body.balance
    try {
      await AppDataSource.manager.update(Account, id, { balance: newBalance })
      const updatedAccount = await AppDataSource.manager.findOneBy(Account, { id: Number(id) })
      return res.status(200).json(updatedAccount)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async deleteAccount(req, res) {
    const { id } = req.params
    try {
      await AppDataSource.manager.delete(Account, { id: Number(id) })
      return res.status(200).json({ message: `id ${id} deleted`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}