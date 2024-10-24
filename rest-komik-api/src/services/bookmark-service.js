import { validate } from "../validations/validation.js"
import { createBookmarkValidation, getBookmarkValidation, searchBookmarkValidation } from "../validations/bookmark-validation.js"
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

const update = async (id, request) => {
    const bookmarkValidate = validate(createBookmarkValidation, request)
    const bookmarkValidateId = validate(getBookmarkValidation, id)

    const bookmark = await prismaClient.bookmark.findFirst({
        where:{
            id: bookmarkValidateId
        },
        select: {
            id: true,
            user_id: true,
            comic_id: true,
            last_chapter: true,
            updated_at: true,
        }
    })

    if (!bookmark) {
        throw new ResponseError(404, "Bookmark is not found")
    }

    const [user, comic] = await Promise.all([
        getUserById(bookmarkValidate.user_id),
        getComicById(bookmarkValidate.comic_id)
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

    const updateBookmark = await prismaClient.bookmark.update({
        where: {
            id: bookmarkValidateId
        },
        data: bookmarkValidate,
        select: {
            id: true,
            user_id: true,
            comic_id: true,
            last_chapter: true,
            updated_at: true,
        }
    })

    return {
        id: updateBookmark.id,
        last_chapter: updateBookmark.last_chapter,
        updated_at: updateBookmark.updated_at,
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

const get = async (id) => {
    const bookmarkValidateId = validate(getBookmarkValidation, id)

    const bookmark = await prismaClient.bookmark.findFirst({
        where:{
            id: bookmarkValidateId
        },
        select: {
            id: true,
            user_id: true,
            comic_id: true,
            last_chapter: true,
            updated_at: true,
        }
    })

    if (!bookmark) {
        throw new ResponseError(404, "Bookmark is not found")
    }

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

    return {
        id: bookmark.id,
        last_chapter: bookmark.last_chapter,
        updated_at: bookmark.updated_at,
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

const searchAndAll = async (request) => {
    request = validate(searchBookmarkValidation, request)

    const skip = (request.page - 1) * request.size

    const filters = []

    if (request.comic_name) {
        filters.push({
            comic: {
                name: {
                    contains: request.comic_name,
                    mode: 'insensitive' // Optional: if you want case-insensitive search
                }
            }
        })
    }

    if (request.type) {
        filters.push({
            comic: {
                type: request.type,
            }
        })
    }

    if (request.genre_name) {
        filters.push({
            comic: {
                genre: {
                    name: {
                        contains: request.genre_name,
                        mode: 'insensitive'
                    }
                }
            }
        })
    }

    if (request.last_chapter) {
        filters.push({
            last_chapter: request.last_chapter
        })
    }

    if (request.updated_at) {
        filters.push({
            updated_at: new Date(request.updated_at),
            // gte: new Date(request.updated_at) // 'gte' means greater than or equal to
            // lte: new Date(request.updated_at) // 'lte' means less than or equal to
            // updated_at: {
            //     gte: new Date(request.start_date), // Greater than or equal to start date
            //     lte: new Date(request.end_date)    // Less than or equal to end date
            // }
        })
    }

    const bookmarks = await prismaClient.bookmark.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip,
    })
    
    // Get All User
    const users = await Promise.all(
        bookmarks.map(bookmark => getUserById(bookmark.user_id))
    );

    // Get All Comic And Genre
    const comics = await Promise.all(
        bookmarks.map(async (bookmark) => {
            const comic = await getComicById(bookmark.comic_id);
            const genre = await getGenreById(comic.genre_id);
    
            return {
                id: comic.id,
                name: comic.name,
                image: comic.image,
                type: comic.type,
                genre: {
                    id: genre.id,
                    name: genre.name
                }
            };
        })
    );

    // Mix Bookmark, User And Comic
    const bookmarkUserComic = bookmarks.map((bookmark, index) => ({
        id: bookmark.id,
        last_chapter: bookmark.last_chapter,
        updated_at: bookmark.updated_at,
        user_id: {
            id: users[index]?.id,
            username: users[index]?.username
        },
        comic_id: {
            id: comics[index]?.id,
            name: comics[index]?.name,
            image: comics[index]?.image,
            type: comics[index]?.type,
            genre: {
                id: comics[index]?.genre.id,
                name: comics[index]?.genre.name
            }
        }
    }));

    const totalItem = await prismaClient.bookmark.count({
        where: {
            AND: filters
        }
    })

    return {
        status: true,
        data: bookmarkUserComic,
        paging: {
            page: request.page,
            total_item: totalItem,
            total_page: Math.ceil(totalItem / request.size),
        }
    }
}

const remove = async (id) => {
    const bookmarkValidateId = validate(getBookmarkValidation, id)

    const bookmark = await prismaClient.bookmark.findFirst({
        where:{
            id: bookmarkValidateId
        },
        select: {
            id: true,
        }
    })

    if (!bookmark) {
        throw new ResponseError(404, "Comic is not found")
    }

    return await prismaClient.bookmark.delete({
        where: {
            id: bookmarkValidateId
        }
    })
}

export default {
    create,
    update,
    get,
    searchAndAll,
    remove
}