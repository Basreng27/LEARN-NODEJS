import { prismaClient } from "../src/app/database.js";
import bcrypt from 'bcrypt'

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const creteTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("test", 10),
            password_confirm: await bcrypt.hash("test", 10),
        }
    })
}
