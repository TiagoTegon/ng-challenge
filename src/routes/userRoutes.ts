import { Router } from "express"
import { UserController } from "../controller/userController"
import { validateJWT } from "../middleware/validateJWT"

export const userRouter = Router()
const userController = new UserController()

userRouter
  .get('/', userController.getAllUser)
  .get('/balance', validateJWT, userController.getBalanceByUser)
  .get('/:id', userController.getUserById)
  .post('/', userController.createUser)
  .post('/login', userController.loginUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)