import { validate } from "../validations/validation.js"
import { createComicValidation, getComicValidation, searchComicValidation } from "../validations/comic-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "../errors/response-error.js"

const create = async (request, file) => {
    const comic = validate(createComicValidation, request)

    if (file && file.buffer) {
        comic.image = file.buffer; // Save Buffer
    } 

    // Conversion image To Base64
    // if (comic && comic.image) {
    //     comic.image = comic.image.toString('base64');
    // }

    const newComic = await prismaClient.comic.create({
        data: comic,
        select: {
            id: true,
            name: true,
            image: true,
            type: true,
            genre_id: true,
        }
    })

    const genre = await prismaClient.genre.findUnique({
        where: { id: newComic.genre_id }
    });

    return {
        id: newComic.id,
        name: newComic.name,
        image: newComic.image,
        type: newComic.type,
        genre: {
            id: genre.id,
            name: genre.name
        }
    };
}

// const update = async (id, request) => {
//     const comicValidate = validate(createComicValidation, request)
//     const comicValidateId = validate(getComicValidation, id)

//     const comic = await prismaClient.comic.findFirst({
//         where:{
//             id: comicValidateId
//         },
//         select: {
//             id: true,
//             name: true,
//         }
//     })

//     if (!genre) {
//         throw new ResponseError(404, "Genre is not found")
//     }

//     return await prismaClient.comic.update({
//         where: {
//             id: comicValidateId
//         },
//         data: comicValidate,
//         select: {
//             id: true,
//             name: true
//         }
//     })
// }

// const get = async (id) => {
//     const comicValidateId = validate(getComicValidation, id)

//     const comic = await prismaClient.comic.findFirst({
//         where:{
//             id: comicValidateId
//         },
//         select: {
//             id: true,
//             name: true,
//         }
//     })

//     if (!genre) {
//         throw new ResponseError(404, "Genre is not found")
//     }

//     return genre
// }

// const searchAndAll = async (request) => {
//     request = validate(searchComicValidation, request)

//     const skip = (request.page - 1) * request.size

//     const filters = []

//     if (request.name) {
//         filters.push({
//             name: {
//                 contains: request.name,
//                 mode: 'insensitive' // Optional: if you want case-insensitive search
//             }
//         })
//     }

//     const comic = await prismaClient.comic.findMany({
//         where: {
//             AND: filters
//         },
//         take: request.size,
//         skip: skip,
//     })

//     const totalItem = await prismaClient.comic.count({
//         where: {
//             AND: filters
//         }
//     })

//     return {
//         status: true,
//         data: comic,
//         paging: {
//             page: request.page,
//             total_item: totalItem,
//             total_page: Math.ceil(totalItem / request.size),
//         }
//     }
// }

// const remove = async (id) => {
//     const comicValidateId = validate(getComicValidation, id)

//     const comic = await prismaClient.comic.findFirst({
//         where:{
//             id: comicValidateId
//         },
//         select: {
//             id: true,
//             name: true,
//         }
//     })

//     if (!genre) {
//         throw new ResponseError(404, "Genre is not found")
//     }

//     return await prismaClient.comic.delete({
//         where: {
//             id: comicValidateId
//         }
//     })
// }

export default {
    create,
    // update,
    // get,
    // searchAndAll,
    // remove
}