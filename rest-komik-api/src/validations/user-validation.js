import Joi from "joi"

const registerUserValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    password_confirm: Joi.string().max(255).required(),
})

const loginUserValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
})

const getUserValidation = Joi.number().min(1).positive().required()

const updateUserValidation = Joi.object({
    username: Joi.string().max(255).optional(),
    password: Joi.string().max(255).optional(),
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}