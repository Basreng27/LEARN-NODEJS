import { validate } from "../validations/validation.js"
import { createBookmarkValidation } from "../validations/bookmark-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "../errors/response-error.js"

const getUserById = async (id) => {
    return await prismaClient.user.findUnique({
        where: { id: id },
    });
};

const getComicById = async (id) => {
    return await prismaClient.comic.findUnique({
        where: { id: id },
    });
};

const getGenreById = async (id) => {
    return await prismaClient.genre.findUnique({
        where: { id: id },
    });
};

const create = async (request) => {
    const bookmark = validate(createBookmarkValidation, request)

    const [user, comic] = await Promise.all([
        getUserById(bookmark.user_id),
        getComicById(bookmark.comic_id)
    ])

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    if (!comic) {
        throw new ResponseError(404, "Comic is not found")
    }

    const genre = await getGenreById(comic.genre_id);

    if (!genre) {
        throw new ResponseError(404, "Genre is not found")
    }

    const newBookmark = await prismaClient.bookmark.create({
        data: bookmark,
        select: {
            id: true,
            user_id: true,
            comic_id: true,
            last_chapter: true,
            updated_at: true,
        }
    })

    return {
        id: newBookmark.id,
        last_chapter: newBookmark.last_chapter,
        updated_at: newBookmark.updated_at,
        user_id: {
            id: user.id,
            username: user.username
        },
        comic_id: {
            id: comic.id,
            name: comic.name,
            image: comic.image,
            type: comic.type,
            genre: {
                id: genre.id,
                name: genre.name
            }
        }
    };
}

// const update = async (id, request, file) => {
//     const comicValidate = validate(updateBookmarkValidation, request)
//     const comicValidateId = validate(getBookmarkValidation, id)

//     const bookmark = await prismaClient.comic.findFirst({
//         where:{
//             id: comicValidateId
//         },
//         select: {
//             id: true,
//             name: true,
//             image: true,
//             type: true,
//             genre_id: true,
//         }
//     })

//     if (!comic) {
//         throw new ResponseError(404, "Comic is not found")
//     }

//     if (file && file.buffer) {
//         comicValidate.image = file.buffer; // Save Buffer
//     } 

//     const genre = await getGenreById(comicValidate.genre_id);

//     if (!genre) {
//         throw new ResponseError(404, "Genre is not found")
//     }

//     const updateComic = await prismaClient.comic.update({
//         where: {
//             id: comicValidateId
//         },
//         data: comicValidate,
//         select: {
//             id: true,
//             name: true,
//             image: true,
//             type: true,
//             genre_id: true,
//         }
//     })

//     return {
//         id: updateComic.id,
//         name: updateComic.name,
//         image: updateComic.image,
//         type: updateComic.type,
//         genre: {
//             id: genre.id,
//             name: genre.name
//         }
//     };
// }

// const get = async (id) => {
//     const comicValidateId = validate(getBookmarkValidation, id)

//     const bookmark = await prismaClient.comic.findFirst({
//         where:{
//             id: comicValidateId
//         },
//         select: {
//             id: true,
//             name: true,
//             image: true,
//             type: true,
//             genre_id: true,
//         }
//     })

//     if (!comic) {
//         throw new ResponseError(404, "Genre is not found")
//     }

//     const genre = await getGenreById(comic.genre_id);

//     if (!genre) {
//         throw new ResponseError(404, "Genre is not found")
//     }

//     return {
//         id: comic.id,
//         name: comic.name,
//         image: comic.image,
//         type: comic.type,
//         genre: {
//             id: genre.id,
//             name: genre.name
//         }
//     };
// }

// const searchAndAll = async (request) => {
//     request = validate(searchBookmarkValidation, request)

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

//     if (request.type) {
//         filters.push({
//             type: request.type,
//         })
//     }

//     if (request.genre_name) {
//         filters.push({
//             genre: {
//                 name: {
//                     contains: request.genre_name,
//                     mode: 'insensitive'
//                 }
//             }
//         })
//     }

//     const comics = await prismaClient.comic.findMany({
//         where: {
//             AND: filters
//         },
//         take: request.size,
//         skip: skip,
//     })
    
//     // Get All Genre
//     const genres = await Promise.all(
//         comics.map(comic => getGenreById(comic.genre_id))
//     );

//     // Mix Comic And Genre
//     const comicsWithGenres = comics.map((comic, index) => ({
//         id: comic.id,
//         name: comic.name,
//         image: comic.image,
//         type: comic.type,
//         genre: {
//             id: genres[index]?.id,
//             name: genres[index]?.name,
//         },
//     }));

//     const totalItem = await prismaClient.comic.count({
//         where: {
//             AND: filters
//         }
//     })

//     return {
//         status: true,
//         data: comicsWithGenres,
//         paging: {
//             page: request.page,
//             total_item: totalItem,
//             total_page: Math.ceil(totalItem / request.size),
//         }
//     }
// }

// const remove = async (id) => {
//     const comicValidateId = validate(getBookmarkValidation, id)

//     const bookmark = await prismaClient.comic.findFirst({
//         where:{
//             id: comicValidateId
//         },
//         select: {
//             id: true,
//         }
//     })

//     if (!comic) {
//         throw new ResponseError(404, "Comic is not found")
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