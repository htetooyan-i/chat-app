import type { Response } from 'express';

import { isAppError } from './appError';

export type ErrorPayload = {
    code: string;
    message: string;
};

export type ApiResponsePayload<T = unknown> = {
    success: boolean;
    message: string;
    data: T | null;
    error: ErrorPayload | null;
};

export const sendSuccess = <T>(res: Response, status: number, message: string, data: T | null = null) => {
    return res.status(status).json({
        success: true,
        message,
        data,
        error: null,
    } as ApiResponsePayload<T>);
};

export const sendError = (res: Response, status: number, code: string, message: string, data: unknown = null) => {
    return res.status(status).json({
        success: false,
        message,
        data,
        error: {
            code,
            message,
        },
    } as ApiResponsePayload);
};

export const sendErrorFromUnknown = (
    res: Response,
    error: unknown,
    fallbackCode = 'INTERNAL_SERVER_ERROR',
    fallbackMessage = 'Internal server error',
    fallbackStatus = 500,
) => {
    if (isAppError(error)) {
        return sendError(res, error.statusCode, error.code, error.message);
    }

    return sendError(res, fallbackStatus, fallbackCode, fallbackMessage);
};
