import express from 'express'
import { publicRouter } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { userRouter } from '../route/api.js';

export const web = express();

web.use(express.json());

// Route
// Public
web.use(publicRouter)
// Private Must Login
web.use(userRouter)

// Middleware
web.use(errorMiddleware)