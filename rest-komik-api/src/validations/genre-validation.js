import Joi from "joi"

const createGenreValidation = Joi.object({
    name: Joi.string().max(255).required(),
})

const getGenreValidation = Joi.number().min(1).positive().required()

const searchGenreValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10), 
    name: Joi.string().max(255).optional(),
})

export {
    createGenreValidation,
    getGenreValidation,
    searchGenreValidation
}