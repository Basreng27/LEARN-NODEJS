import Joi from "joi"

const createAddressValidation = Joi.object({
    street: Joi.string().max(255).optional(),
    city: Joi.string().max(255).optional(),
    province: Joi.string().max(255).optional(),
    country: Joi.string().max(255).required(),
    postal_code: Joi.string().max(255).required(),
})

export {
    createAddressValidation
}