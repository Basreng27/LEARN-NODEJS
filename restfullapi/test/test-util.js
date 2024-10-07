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

// Remove Contact Test
const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username_user: 'test'
        }
    });
}

// Create Contact Test
export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@pzn.com",
            phone: "080900000"
        }
    })
}

export {
    removeTestUser,
    createTestUser,
    removeAllTestContacts
}