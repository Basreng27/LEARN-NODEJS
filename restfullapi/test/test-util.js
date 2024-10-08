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
            username_user: "test",
            first_name: "test",
            last_name: "test",
            email: "test@test.com",
            phone: "080900000"
        }
    })
}

// Get Test Contact
export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username_user: 'test'
        }
    })
}

// Create Many
export const createManyTestContacts = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username_user: `test`,
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `test${i}@test.com`,
                phone: `080900000${i}`
            }
        })
    }
}

// Remove Address
export const removeAllTestAddresses = async () => {
    await prismaClient.address.deleteMany({
        where: {
            contact: { // Find Contact
                username_user: "test"
            }
        }
    });
}

// Create Address
export const createTestAddress = async () => {
    const contact = await getTestContact();
    await prismaClient.address.create({
        data: {
            contact_id: contact.id,
            street: "jalan test",
            city: 'kota test',
            province: 'provinsi test',
            country: 'indonesia',
            postal_code: '234234'
        }
    })
}

// Get Address
export const getTestAddress = async () => {
    return prismaClient.address.findFirst({
        where: {
            contact: {
                username_user: "test"
            }
        }
    })
}

export {
    removeTestUser,
    createTestUser,
    removeAllTestContacts
}