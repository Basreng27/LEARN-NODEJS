import { validate } from "../validations/validation.js"
import { getValidation, loginValidation, registerValidation } from "../validations/user-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "../errors/response-error.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'

const register = async (request) => {
    const user = validate(registerValidation, request)

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser > 0) {
        throw new ResponseError(400, "Username already exists")
    }
    
    if (user.password !== user.password_confirm) {
        throw new ResponseError(400, "Password do not match")
    }

    user.password = await bcrypt.hash(user.password, 10)
    delete user.password_confirm;

    return prismaClient.user.create({
        data: user,
        select: {
            username: true
        }
    })
}

const login = async (request) => {
    const loginRequest = validate(loginValidation, request)

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true,
        }
    })

    if (!user) {
        throw new ResponseError(401, "Wrong username or password")
    }
    
    const passwordIsValid = await bcrypt.compare(loginRequest.password, user.password)
    
    if (!passwordIsValid) {
        throw new ResponseError(401, "Wrong username or password")
    }

    const token = uuid().toString()

    return await prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    })
}

const get = async (id) => {
    const userValidate = validate(getValidation, id)

    const user = prismaClient.user.findUnique({
        where: {
            id: userValidate
        },
        select: {
            id: true,
            username: true
        }
    })

    if (!user) {
        throw new ResponseError(404, "User not found")
    }

    return user
}

export default {
    register,
    login,
    get
}