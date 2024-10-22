import { validate } from "../validations/validation.js"
import { createGenreValidation } from "../validations/genre-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "../errors/response-error.js"

const create = async (request) => {
    const genre = validate(createGenreValidation, request)

    return await prismaClient.genre.create({
        data: genre,
        select: {
            id: true,
            name: true
        }
    })
}

export default {
    create,
}