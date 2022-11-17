import { getManager } from "typeorm";
import { Account } from "../entity/Account";

export class AccountController {

  async createAccount(req, res) {
    const newAccount = new Account()
    try {
      const newAccountCreate = await getManager().save(newAccount)
      return res.status(200).json(newAccountCreate)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async getAllAccount(req, res) {
    try {
      const allAccounts = await getManager().find(Account)
      return res.status(200).json(allAccounts)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async getAccountById(req, res) {
    const { id } = req.params
    try {
      const findAccount = await getManager().findOne(Account, id)
      return res.status(200).json(findAccount)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async updateAccount(req, res) {
    const { id } = req.params
    const newBalance = req.body.balance
    try {
      await getManager().update(Account, id, { balance: newBalance })
      const updatedAccount = await getManager().findOne(Account, id)
      return res.status(200).json(updatedAccount)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async deleteAccount(req, res) {
    const { id } = req.params
    try {
      await getManager().delete(Account, id)
      return res.status(200).json({ message: `id ${id} deleted`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}