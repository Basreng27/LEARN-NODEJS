// Validation Using Joy
import Joi from "joi"

// For Register
const registerUserValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    name: Joi.string().max(255).required(),
});

// For Login
const loginUserValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
});

// For Get Data With Username
const getUserValidation = Joi.string().max(255).required()

// For Update
const updateUserValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).optional(), // Optional
    name: Joi.string().max(255).optional(), // Optional
})

// Export To Can Consume
export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}