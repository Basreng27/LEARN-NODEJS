// Validation Using Joy
import Joi from "joi"

// for Register
const registerUserValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    name: Joi.string().max(255).required(),
});

// for Login
const loginUserValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
});

// Export To Can Consume
export {
    registerUserValidation,
    loginUserValidation
}