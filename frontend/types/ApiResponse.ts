export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message: string;
    error: {
        code: string;
        detail: string;
    } | null;
};