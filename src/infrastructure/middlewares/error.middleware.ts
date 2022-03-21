import {HttpException} from '../../domain/exceptions/http.exception';
import {NextFunction, Request, Response} from 'express';

export const errorResponseMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const timestamp = error.timestamp;
    const message = error.message || 'Something went wrong';
    response.status(status).send({
        status,
        timestamp,
        message,
    });
};