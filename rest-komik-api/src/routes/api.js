import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware.js';
import userController from '../controller/user-controller.js';

const userRouter = new express.Router();

userRouter.use(authMiddleware)

userRouter.get('/api/comic/user/:id', userController.get)
userRouter.patch('/api/comic/user/:id', userController.update)

export {
    userRouter
}