import Joi from "joi"

const registerValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    password_confirm: Joi.string().max(255).required(),
})

const loginValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
})

const getValidation = Joi.number().min(1).positive().required()

export {
    registerValidation,
    loginValidation,
    getValidation
}