import { ResponseError } from "../errors/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next()

        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            status: false,
            error: err.message
        }).end()
    } else {
        res.status(500).json({
            status: false,
            error: err.message
        }).end()
    }
}

export {
    errorMiddleware
}