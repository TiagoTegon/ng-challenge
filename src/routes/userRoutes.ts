import { Router } from "express"
import { UserController } from "../controller/userController"

export const userRouter = Router()
const userController = new UserController()

userRouter
  // .get('/', userController.getAllUser)
  // .get('/:id', userController.getUserById)
  .post('/create', userController.createUser)
  // .put('/:id', userController.updateUser)
  // .delete('/:id', userController.deleteUser)