// Function
import { ResponseError } from "../error/response-error.js";

// Validate Function
const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnkow: false // If Added A Column That Should Not Be
    })

    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}

// Export To Can Consume
export {
    validate
}