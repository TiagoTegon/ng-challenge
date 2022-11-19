import { AppDataSource } from "../data-source"
import { Account } from "../entity/Account"
import { User } from "../entity/User"

import * as crypto from "crypto"
import * as jwt from "jsonwebtoken"

function hashPassword(password: string) {
  let hash = crypto.createHmac('sha256', 'ng-challenge')
  let update = hash.update(password)
  let digest = update.digest('hex')
  return digest
}
export class UserController {

  async createUser(req, res) {
    const { username, password } = req.body
    if (username.length < 3)
      return res.status(500).json({ error: 'Username must contain at least 3 characters' })
    if (password.length < 8 || !password.match(/(?=.*[A-Z])(?=.*[0-9])/gm))
      return res.status(500).json({ error: 'Password needs at sleast 8 characters, one number and one capital letter required' })

    const hashedPassword = hashPassword(password)
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const newAccountCreate = new Account()
      await queryRunner.manager.save(newAccountCreate)
      const newUser = new User(username, hashedPassword, newAccountCreate)
      await queryRunner.manager.save(newUser)
      await queryRunner.commitTransaction()
      return res.status(200).json(newUser)
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return res.status(500).json(error.message)
    }
  }

  async getAllUser(req, res) {
    try {
      const allUsers = await AppDataSource.manager.find(User, {
        relations: { account: true }
      })
      return res.status(200).json(allUsers)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async getUserById(req, res) {
    const { id } = req.params
    try {
      const findUser = await AppDataSource.manager.findOne(User, {
        where: { id: Number(id) },
        relations: { account: true }
      })
      return res.status(200).json(findUser)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async updateUser(req, res) {
    const { id } = req.params
    const { username, password } = req.body

    try {
      if (username.length < 3)
        return res.status(500).json({ error: 'Username must contain at least 3 characters' })
      if (password.length < 8 || !password.match(/(?=.*[A-Z])(?=.*[0-9])/gm))
        return res.status(500).json({ error: 'Password needs at sleast 8 characters, one number and one capital letter required' })

      await AppDataSource.manager.update(User, id, { username: username, password: password })
      const updatedUser = await AppDataSource.manager.findOneBy(User, { id: Number(id) })
      return res.status(200).json(updatedUser)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const findUser = await AppDataSource.manager.findOne(User, {
        where: { id: Number(id) },
        relations: { account: true }
      })
      const accountId = findUser.account.id
      await AppDataSource.manager.delete(User, { id: Number(id) })
      await AppDataSource.manager.delete(Account, { id: Number(accountId) })
      await queryRunner.commitTransaction()
      return res.status(200).json({ message: `User ${id} deleted and Account ${accountId} deleted`})
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return res.status(500).json(error.message)
    }
  }

  async loginUser(req, res) {
    const { username, password } = req.body
    try {
      const findUser = await AppDataSource.manager.findOne(User, {
        where: { username: username },
      })
      if(findUser === null) throw new Error(`User ${username} not found`)
      if(findUser.password !== hashPassword(password)) throw new Error(`Invalid password`)

      const privateKey = 'ng-challenge'
      console.log(findUser)
      const token = jwt.sign({ username: findUser.username, password: findUser.password }, privateKey, { expiresIn: "24h" })
      return res.status(200).json({ "x-access-token": token })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async getBalanceByUser(req, res) {
    const { username } = req.body
    try {
      const userBalance = await AppDataSource.manager.findOne(User, {
        where: { username: username},
        relations: { account: true }
      })
      return res.status(200).json(userBalance.account.balance)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}