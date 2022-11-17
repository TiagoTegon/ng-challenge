import { Router } from "express"
import { AccountController } from "../controller/AccountController"

export const accountRouter = Router()
const accountController = new AccountController()

accountRouter
  .get('/', accountController.getAllAccount)
  .get('/:id', accountController.getAccountById)
  .post('/create', accountController.createAccount)
  .put('/:id', accountController.updateAccount)
  .delete('/:id', accountController.deleteAccount)