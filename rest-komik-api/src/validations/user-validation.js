import Joi from "joi"

const registerValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    password_confirm: Joi.string().max(255).required(),
})

export {
    registerValidation,
}