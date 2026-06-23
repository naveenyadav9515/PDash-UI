/**
 * Feature Log domain model.
 * Represents a user-logged upcoming feature idea with point-wise details.
 */
export interface FeatureLog {
  /** Unique identifier */
  id: string;
  /** Name of the feature */
  name: string;
  /** Point-wise details describing the feature */
  details: string[];
  /** ISO timestamp of when the feature was logged */
  createdAt: string;
}
