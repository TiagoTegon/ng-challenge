import { Router } from "express"
import { TransactionController } from "../controller/TransactionController"
import { UserController } from "../controller/userController"
import { validateJWT } from "../middleware/validateJWT"

export const userRouter = Router()
const userController = new UserController()
const transactionController = new TransactionController()

userRouter
  .get('/', userController.getAllUser)
  .get('/:username/balance', validateJWT, userController.getBalanceByUser)
  .get('/:id', userController.getUserById)
  .get('/:username/transaction', validateJWT, transactionController.getTransactionByUser)
  .post('/', userController.createUser)
  .post('/login', userController.loginUser)
  .post('/:username/transaction', validateJWT, transactionController.createTransaction)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)