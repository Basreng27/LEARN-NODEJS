import Joi from "joi"

const createGenreValidation = Joi.object({
    name: Joi.string().max(255).required(),
})

const getGenreValidation = Joi.number().min(1).positive().required()

export {
    createGenreValidation,
    getGenreValidation
}