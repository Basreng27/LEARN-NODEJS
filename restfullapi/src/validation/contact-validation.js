import Joi from "joi"

const createContactValidation = Joi.object({
    first_name: Joi.string().max(255).required(),
    last_name: Joi.string().max(255).optional(),
    email: Joi.string().max(255).email().optional(),
    phone: Joi.string().max(20).optional(),
})

const getContactValidation = Joi.number().positive().required() // Must Be Positive Number

const updateContactValidation = Joi.object({
    id: Joi.number().positive().required(),
    first_name: Joi.string().max(255).required(),
    last_name: Joi.string().max(255).optional(),
    email: Joi.string().max(255).email().optional(),
    phone: Joi.string().max(20).optional(),
})

const searchContactValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1), // Default Value 1
    size: Joi.number().min(1).positive().max(100).default(10), // Default Value 1
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
})

export {
    createContactValidation,
    getContactValidation,
    updateContactValidation,
    searchContactValidation
}