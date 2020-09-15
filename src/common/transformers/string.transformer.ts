import { Transform } from 'class-transformer';

/**
 * Transform string with trim
 */
export const TransformTrimString = () => Transform(v => (typeof v === 'string' ? v.trim() : v));
