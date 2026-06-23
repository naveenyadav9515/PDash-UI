/**
 * Feature domain model.
 * Represents a single application feature as stored in the backend.
 */
export interface Feature {
  /** Unique identifier from MongoDB */
  _id: string;
  /** Display name of the feature */
  name: string;
  /** Brief description of the feature's purpose */
  description: string;
  /** Material Symbols icon name */
  icon: string;
  /** Whether the feature is currently enabled */
  enabled: boolean;
}
