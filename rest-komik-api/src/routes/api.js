import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware.js';
import userController from '../controller/user-controller.js';
import genreController from '../controller/genre-controller.js';
import comicController from '../controller/comic-controller.js';

const userRouter = new express.Router();

userRouter.use(authMiddleware)

userRouter.get('/api/comic/user/:id', userController.get)
userRouter.patch('/api/comic/user/:id', userController.update)
userRouter.delete('/api/comic/logout/:id', userController.logout)

userRouter.post('/api/comic/genre', genreController.create)
userRouter.put('/api/comic/genre/:id', genreController.update)
userRouter.get('/api/comic/genre/:id', genreController.get)
userRouter.get('/api/comic/genre', genreController.searchAndAll)
userRouter.delete('/api/comic/genre/:id', genreController.remove)

userRouter.post('/api/comic', comicController.create)
userRouter.patch('/api/comic/:id', comicController.update)
// userRouter.get('/api/comic/:id', comicController.get)
// userRouter.get('/api/comic', comicController.searchAndAll)
// userRouter.delete('/api/comic/:id', comicController.remove)

export {
    userRouter
}