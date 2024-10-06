import { prismaClient } from "../src/application/database";

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    });
}

const createTestUser = async() => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: "test",
            name: "test",
            token: "test",
        }
    })
}


export {
    removeTestUser,
    createTestUser
}