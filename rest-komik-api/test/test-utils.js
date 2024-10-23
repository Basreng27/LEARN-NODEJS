import { prismaClient } from "../src/app/database.js";
import bcrypt from 'bcrypt'

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            id: 1,
            username: "test",
            password: await bcrypt.hash("test", 10),
            token: "test",
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    })
}

export const removeTestGenre = async () => {
    await prismaClient.genre.deleteMany()
}

export const createTestGenre = async () => {
    await prismaClient.genre.create({
        data: {
            id: 1,
            name: "test genre",
        }
    })
}

export const createManyTestGenres = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.genre.create({
            data: {
                id: i,
                name: `test ${i}`,
            }
        })
    }
}

export const getTestGenre = async () => {
    return prismaClient.genre.findUnique({
        where: {
            id: 1
        }
    })
}

export const removeTestComic = async () => {
    await prismaClient.comic.deleteMany()
}

export const createTestComic = async () => {
    await prismaClient.comic.create({
        data: {
            id: 1,
            name: "test",
            image: null,
            type: "Manhwa",
            genre_id: {
                connect: {
                    id: 1
                }
            },
        }
    })
}

export const createManyTestComics = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.comic.create({
            data: {
                id: i,
                name: `test ${i}`,
                image: null,
                type: "Manhwa",
                genre_id: {
                    connect: {
                        id: 1
                    }
                },
            }
        })
    }
}

export const getTestComic = async () => {
    return prismaClient.comic.findUnique({
        where: {
            id: 1
        }
    })
}
