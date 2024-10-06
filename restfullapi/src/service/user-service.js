import { registerUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js"
import bcrypt from 'bcrypt'

const register = async (request) => {
    // Validate
    const user = validate(registerUserValidation, request)

    // Find User With The Same Username
    const countUser = await prismaClient.user.count({
        where:{
            username: user.username
        }
    })

    // If Coun More Than 0
    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists")
    }

    // Hash Password
    user.password = await bcrypt.hash(user.password, 10)

    // If No Same Username, Create New User
    return prismaClient.user.create({
        data: user, // Send To Create User
        select: { // Return What Will Show
            username: true,
            name: true
        }
    })
}

// Using "default" If Can More Than 1
export default {
    register
}
