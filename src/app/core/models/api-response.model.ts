import { User } from './user.model';
import { Feature } from './feature.model';

/**
 * API response DTOs.
 * Standardized response envelopes from the backend API.
 */

/** Response envelope for the features list endpoint */
export interface FeaturesResponse {
  status: string;
  count: number;
  data: Feature[];
}

/** Response envelope for the health-check endpoint */
export interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
  uptime?: number;
}

/** Authentication Payload (User data + Token) */
export interface AuthPayload extends User {
  token: string;
}

/** Response envelope for authentication endpoints */
export interface AuthResponse {
  status: string;
  data: AuthPayload;
}
