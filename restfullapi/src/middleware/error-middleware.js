import { ResponseError } from "../error/response-error.js"

const errorMiddleware = async (err, req, res, next) => {
    // If Not Error Next
    if (!err) {
        next();

        return;
    }
    
    // If Error From ResponeError in file response-error,js
    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else {
        res.status(500).json({
            errors: err.message
        }).end();
    }
}

export {
    errorMiddleware
}