import Joi from "joi"

const getComicValidation = Joi.number().min(1).positive().required()

const createComicValidation = Joi.object({
    name: Joi.string().max(255).required(),
    image: Joi.binary().optional(),
    type: Joi.string().valid('Manhua', 'Manga', 'Manhwa').required(),
    genre_id: Joi.number().min(1).positive().required(),
})

const updateComicValidation = Joi.object({
    name: Joi.string().max(255).optional(),
    image: Joi.binary().optional(),
    type: Joi.string().valid('Manhua', 'Manga', 'Manhwa').optional(),
    genre_id: Joi.number().min(1).positive().optional(),
})

const searchComicValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10), 
    name: Joi.string().max(255).optional(),
    type: Joi.string().valid('Manhua', 'Manga', 'Manhwa').optional(),
    genre_name: Joi.string().max(255).optional(),
})

export {
    createComicValidation,
    getComicValidation,
    searchComicValidation,
    updateComicValidation
}