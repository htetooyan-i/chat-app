export class AppError extends Error {
    public readonly code: string;
    public readonly statusCode: number;

    constructor(code: string, message: string, statusCode = 400) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'AppError';
    }
}

export const isAppError = (error: unknown): error is AppError => {
    return error instanceof AppError;
};
