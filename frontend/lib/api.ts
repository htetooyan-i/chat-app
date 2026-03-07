import axios, { AxiosError } from 'axios';

type ApiError = {
  message?: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

export const getErrorMessage = (
    err: unknown,
    defaultErrorMessage: string
): string => {
  if (err instanceof AxiosError) {
    const axiosError = err as AxiosError<ApiError>;
    return axiosError.response?.data?.message ?? defaultErrorMessage;
  }

  return defaultErrorMessage;
};

export default api;
