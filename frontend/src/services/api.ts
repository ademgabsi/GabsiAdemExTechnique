import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api';

export interface ErreurApiBackend {
  statusCode?: number;
  message?: string;
  timestamp?: string;
  path?: string;
}

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErreurApiBackend>) => {
    const message =
      error.response?.data?.message ??
      (error.code === 'ECONNABORTED'
        ? 'Le serveur met trop de temps à répondre.'
        : 'Impossible de joindre le serveur.');
    return Promise.reject(new ApiError(message, error.response?.status));
  },
);
