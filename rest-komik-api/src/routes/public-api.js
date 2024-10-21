import express from "express"
import userController from "../controller/user-controller.js"

const publicRouter = new express.Router()

publicRouter.post('/api/comic/regist', userController.register)
publicRouter.post('/api/comic/login', userController.login)

export {
    publicRouter
}