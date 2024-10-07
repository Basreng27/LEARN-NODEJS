import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js"
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

// For Register
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

// For Login
const login = async (request) => {
    // Validate
    const loginRequest = validate(loginUserValidation, request)

    // Find User With The Same Username
    const user = await prismaClient.user.findUnique({
        where:{
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true,
        }
    })
    
    if (!user) {
        throw new ResponseError(401, "Username OR Password Wrong")
    }
    
    // Bcyrpt Compare
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)    
    
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username OR Password Wrong")
    }

    // Create Token
    const token = uuid().toString()

    // Update Token In Table User
    return await prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: { // Return What Will Show
            token: true,
        }
    });
}

// For Get
const get = async (username) => {
    username = validate(getUserValidation, username) 

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true,
        }
    })

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return user
}

// For Update
const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    // Undifined User
    if (totalUserInDatabase !== 1) {
        throw new ResponseError(404, "Username is not found")
    }

    const data = {};

    // If Name Not Empty Update Name
    if (user.name) {
        data.name = user.name
    }

    // If Password Not Empty Update Password
    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10)
    }

    // Update User
    return prismaClient.user.update({
        where: { 
            username: user.username,
        },
        data: data, // Send Data
        select: { // Return What Will Show
            username: true,
            name: true
        }
    })
}

// For Logout
const logout = async (username) => {
    username = validate(getUserValidation, username) 

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
    })

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return prismaClient.user.update({
        where: {
            username: user.username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}

// Using "default" If Can More Than 1
export default {
    register,
    login,
    get,
    update,
    logout
}
