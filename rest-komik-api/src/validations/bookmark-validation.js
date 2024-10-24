import Joi from "joi"

const createBookmarkValidation = Joi.object({
    user_id: Joi.number().min(1).positive().required(),
    comic_id: Joi.number().min(1).positive().required(),
    last_chapter: Joi.number().min(0).positive().required(),
    updated_at: Joi.date().required(),
})

// const updateBookmarkValidation = Joi.object({
//     name: Joi.string().max(255).optional(),
//     image: Joi.binary().optional(),
//     type: Joi.string().valid('Manhua', 'Manga', 'Manhwa').optional(),
//     genre_id: Joi.number().min(1).positive().optional(),
// })

// const getBookmarkValidation = Joi.number().min(1).positive().required()

// const searchBookmarkValidation = Joi.object({
//     page: Joi.number().min(1).positive().default(1),
//     size: Joi.number().min(1).positive().max(100).default(10), 
//     name: Joi.string().max(255).optional(),
//     type: Joi.string().valid('Manhua', 'Manga', 'Manhwa').optional(),
//     genre_name: Joi.string().max(255).optional(),
// })

export {
    createBookmarkValidation,
    // getBookmarkValidation,
    // searchBookmarkValidation,
    // updateBookmarkValidation
}