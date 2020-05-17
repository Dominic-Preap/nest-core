import { tuple } from './base';

export type ImageSize = 'lg' | 'md' | 'sm' | 'xs';

/**
 * Used as directory in cloud storage and as default image size when doing resize
 * @see check in `upload.service.ts` and `upload.helper.ts` for more details
 */
export type ImageType = typeof ImageEnum[number];
export const ImageEnum = tuple('temp', 'badge', 'team', 'user');
