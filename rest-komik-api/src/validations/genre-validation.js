import Joi from "joi"

const createGenreValidation = Joi.object({
    name: Joi.string().max(255).required(),
})

export {
    createGenreValidation,
}