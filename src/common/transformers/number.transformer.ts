import { Transform } from 'class-transformer';

/**
 * Transform input to number. default is 0.
 */
export const TransformToNumber = () => Transform(v => (isNaN(+v) ? 0 : +v));
