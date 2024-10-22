import { validate } from "../validations/validation.js"
import { createGenreValidation, getGenreValidation } from "../validations/genre-validation.js"
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

const update = async (id, request) => {
    const genreValidate = validate(createGenreValidation, request)
    const genreValidateId = validate(getGenreValidation, id)

    const genre = await prismaClient.genre.findFirst({
        where:{
            id: genreValidateId
        },
        select: {
            id: true,
            name: true,
        }
    })

    if (!genre) {
        throw new ResponseError(404, "Genre is not found")
    }

    return await prismaClient.genre.update({
        where: {
            id: genreValidateId
        },
        data: genreValidate,
        select: {
            id: true,
            name: true
        }
    })
}

const get = async (id) => {
    const genreValidateId = validate(getGenreValidation, id)

    const genre = await prismaClient.genre.findFirst({
        where:{
            id: genreValidateId
        },
        select: {
            id: true,
            name: true,
        }
    })

    if (!genre) {
        throw new ResponseError(404, "Genre is not found")
    }

    return genre
}

export default {
    create,
    update,
    get
}