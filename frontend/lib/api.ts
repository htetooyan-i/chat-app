import axios, { AxiosError } from 'axios';
import {ApiResponse} from "@/types/ApiResponse";


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
    // Axios wraps backend JSON in err.response.data
    const response = err.response?.data as ApiResponse<void> | undefined;
    return response?.error?.detail ?? defaultErrorMessage;
  }

  return defaultErrorMessage;
};
