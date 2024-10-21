import { validate } from "../validations/validation.js"
import { registerValidation } from "../validations/user-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "../errors/response-error.js"
import bcrypt from "bcrypt"

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

export default {
    register,
}