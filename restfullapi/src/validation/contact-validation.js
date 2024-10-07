import Joi from "joi"

const createContactValidation = Joi.object({
    first_name: Joi.string().max(255).required(),
    last_name: Joi.string().max(255).optional(),
    email: Joi.string().max(255).email().optional(),
    phone: Joi.string().max(20).optional(),
})

const getContactValidation = Joi.number().positive().required() // Must Be Positive Number

export {
    createContactValidation,
    getContactValidation
}