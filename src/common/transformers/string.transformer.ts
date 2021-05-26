import { Transform } from 'class-transformer';

/**
 * Transform string with trim
 */
export const TransformTrimString = () =>
  Transform(({ value }) => (typeof value === 'string' ? value.trim() : value));
