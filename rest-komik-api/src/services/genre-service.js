import { validate } from "../validations/validation.js"
import { createGenreValidation, getGenreValidation, searchGenreValidation } from "../validations/genre-validation.js"
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

const searchAndAll = async (request) => {
    request = validate(searchGenreValidation, request)

    const skip = (request.page - 1) * request.size

    const filters = []

    if (request.name) {
        filters.push({
            name: {
                contains: request.name,
                mode: 'insensitive' // Optional: if you want case-insensitive search
            }
        })
    }

    const genre = await prismaClient.genre.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip,
    })

    const totalItem = await prismaClient.genre.count({
        where: {
            AND: filters
        }
    })

    return {
        status: true,
        data: genre,
        paging: {
            page: request.page,
            total_item: totalItem,
            total_page: Math.ceil(totalItem / request.size),
        }
    }
}

export default {
    create,
    update,
    get,
    searchAndAll
}