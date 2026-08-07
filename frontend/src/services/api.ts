import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api';

export interface ErreurApiBackend {
  statusCode?: number;
  message?: string;
  timestamp?: string;
  path?: string;
}

export type ApiErreurType = 'reseau' | 'serveur' | 'client' | 'inconnu';

export class ApiError extends Error {
  readonly status?: number;
  readonly type: ApiErreurType;

  constructor(message: string, status?: number, type: ApiErreurType = 'inconnu') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.type = type;
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
    const status = error.response?.status;

    if (error.response) {
      if (status && status >= 500) {
        return Promise.reject(new ApiError(messageServeur(), status, 'serveur'));
      }
      return Promise.reject(
        new ApiError(messageClient(error.response.data), status, 'client'),
      );
    }

    const message = error.code === 'ECONNABORTED' ? messageTimeout() : messageReseau();
    return Promise.reject(new ApiError(message, status, 'reseau'));
  },
);

export function estErreurReseau(error: unknown): boolean {
  return error instanceof ApiError && error.type === 'reseau';
}

export function estBackendIndisponible(error: unknown): boolean {
  return (
    error instanceof ApiError && (error.type === 'reseau' || error.type === 'serveur')
  );
}

export function normaliserErreur(e: unknown): ApiError {
  if (e instanceof ApiError) return e;
  if (e instanceof Error) return new ApiError(e.message);
  return new ApiError('Une erreur inattendue est survenue.');
}

function messageReseau(): string {
  return 'Impossible de joindre le serveur. Vérifiez que le backend est démarré et votre connexion réseau.';
}

function messageTimeout(): string {
  return 'Le serveur met trop de temps à répondre.';
}

function messageServeur(): string {
  return 'Le serveur rencontre un problème. Merci de réessayer plus tard.';
}

function messageClient(data?: ErreurApiBackend): string {
  return data?.message ?? 'La requête est invalide.';
}
