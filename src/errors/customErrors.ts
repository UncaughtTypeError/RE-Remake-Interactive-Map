/**
 * @file Custom error classes for the Express API.
 * @description Defines HTTP error classes with status codes for consistent error handling.
 * Messages are sourced from {@link Messages} in `src/constants/messages.ts` for consistency.
 */
import { Messages } from '../constants';

export interface HttpError extends Error {
    statusCode: number;
}

export class NotFoundError extends Error implements HttpError {
    statusCode: number = 404;

    constructor(message: string = Messages.errors.notFound) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

export class BadRequestError extends Error implements HttpError {
    statusCode: number = 400;

    constructor(message: string = Messages.validation.invalidQueryParameters) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}
