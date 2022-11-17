import { Router } from "express"
import { AccountController } from "../controller/AccountController"
import { TransactionController } from "../controller/TransactionController"

export const accountRouter = Router()
const accountController = new AccountController()
const transactionController = new TransactionController()

accountRouter
  .get('/', accountController.getAllAccount) 
  .get('/:id', accountController.getAccountById)
  .get('/:id/transaction', transactionController.getAllTransactionByAccount)
  .post('/', accountController.createAccount)
  .post('/:id/transaction', transactionController.createTransaction)
  .put('/:id', accountController.updateAccount)
  .delete('/:id', accountController.deleteAccount)