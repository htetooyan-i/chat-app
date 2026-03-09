import axios, { AxiosError } from 'axios';

type ApiError = {
  message?: string;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

export const cloudinaryApi = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}`,
  withCredentials: false
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

