/**
 * API response DTOs.
 * Standardized response envelopes from the backend API.
 */

/** Response envelope for the features list endpoint */
export interface FeaturesResponse {
  status: string;
  count: number;
  data: import('./feature.model').Feature[];
}

/** Response envelope for the hello/health-check endpoint */
export interface HelloResponse {
  status: string;
  message: string;
  timestamp: string;
}
