import { validate } from "../validations/validation.js"
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validations/user-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "../errors/response-error.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'

const register = async (request) => {
    const user = validate(registerUserValidation, request)

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
    const loginRequest = validate(loginUserValidation, request)

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
    const userValidate = validate(getUserValidation, id)

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
        throw new ResponseError(404, "User is not found")
    }

    return user
}

const update = async (id, request) => {
    const user = validate(updateUserValidation, request)
    const userValidateId = validate(getUserValidation, id)

    const totalUser = prismaClient.user.count({
        where: {
            id: userValidateId
        }
    })

    if (totalUser > 0) {
        throw new ResponseError(404, "User is not found")
    }

    const data = {}

    if (user.username) {
        data.username = user.username
    }

    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10)
    }

    return await prismaClient.user.update({
        where: {
            id: userValidateId
        },
        data: data,
        select: {
            id: true,
            username: true
        }
    })
}

const logout = async (id) => {
    const userValidate = validate(getUserValidation, id)

    const user = prismaClient.user.findUnique({
        where: {
            id: userValidate
        }
    })

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return await prismaClient.user.update({
        where: {
            id: userValidate
        },
        data: {
            token: null
        }
    })
}

export default {
    register,
    login,
    get,
    update,
    logout
}