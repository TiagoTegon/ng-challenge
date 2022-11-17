import { getManager } from "typeorm"
import { Account } from "../entity/Account"
import { User } from "../entity/User"

export class UserController {

  async createUser(req, res) {
    const { username, password } = req.body
    try {
      // if(username.length < 3) 
      //   throw new Error('Username must contain at least 3 characters')
      // if(password.length < 8 || !password.match(/(?=.*[A-Z])(?=.*[0-9])/gm)) 
      //   throw new Error('Password needs at least 8 characters, one number and one capital letter required')
      console.log(username, password)
      const newAccount = new Account()
      const newAccountCreate = await getManager().save(newAccount)

      const newUser = new User(username, password, newAccountCreate)
      const newUserCreate = await getManager().save(newUser)
      return res.status(200).json(newUserCreate)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}