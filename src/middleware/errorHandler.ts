import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError, BadRequestError, HttpError } from '../errors/customErrors';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
): Response | void => {
    if (process.env.NODE_ENV !== 'test' && process.env.DEBUG_MODE === 'true') {
        console.error(err.stack); // Log for debugging
    }

    // Customize based on error message or type
    if (err instanceof NotFoundError || err instanceof BadRequestError) {
        return res.status((err as HttpError).statusCode).json({ error: err.message });
    }

    // Default to 500 for unexpected errors
    res.status(500).json({ error: 'Internal Server Error' });
};
