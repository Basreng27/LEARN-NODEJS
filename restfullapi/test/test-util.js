import { prismaClient } from "../src/application/database.js";
import bcrypt from 'bcrypt'

// Remove Test User
const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    });
}

// Add Test User
const createTestUser = async() => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("test", 10),
            name: "test",
            token: "test",
        }
    })
}

// Get Test
export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    })
}

export {
    removeTestUser,
    createTestUser
}