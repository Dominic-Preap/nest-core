import { createReadStream, createWriteStream } from 'fs';
import sharp = require('sharp');

import { T } from '@common';

interface ResizeOption {
  width: number;
  height: number;
  quality?: number;
}

type GetImageSizeResult = { [key in Size]: ResizeOption };

export type Size = 'xs' | 'sm' | 'md' | 'lg';

export class ImageResizeHelper {
  // prettier-ignore
  /**
   * ! Declare any new image type and default size here
   */
  private IMAGE_DIMENSIONS = new Map<T.ImageType, string>([
    ['badge',   '512x512'],
    ['team',    '512x512'],
    ['user',    '300x300']
  ]);

  // prettier-ignore
  /**
   * ['xs': 3] meaning if size is `xs`, divided default width & height by 3
   */
  private SIZES = new Map([
    ['xs', 3],  // _t
    ['sm', 2],  // _s
    ['md', 1.5], // _m
    ['lg', 0.66] // _l : meaning multiply 1.5 time of the default size (* 1.5)
  ]);

  /**
   * Resize image based on giving path, type and size
   *
   * @param {string} path Image path you want to resize
   * @param {T.ImageType} type Image type you want to resize (effect width and height)
   * @param {(boolean | Size[])} size if true, resize all type, or can choose specific resize type
   * @memberof ImageResizeHelper
   */
  async resize(path: string, type: T.ImageType, size: boolean | Size[]) {
    const s: Size[] = Array.isArray(size) ? size : ['lg', 'md', 'sm', 'xs'];
    const imgSize = this.getImageSize(type, ...s);

    await Promise.all([
      this.sharpResize(path, path.replace('.', '_l.'), imgSize.lg),
      this.sharpResize(path, path.replace('.', '_m.'), imgSize.md),
      this.sharpResize(path, path.replace('.', '_s.'), imgSize.sm),
      this.sharpResize(path, path.replace('.', '_t.'), imgSize.xs)
    ]);
  }

  /**
   * Return a width & height object based on input size
   * @example { xs: {width: 100, height: 100}, sm: {width: 200, height: 200} }
   */
  private getImageSize(type: T.ImageType, ...sizes: Size[]): GetImageSizeResult {
    const dimension = this.IMAGE_DIMENSIONS.get(type);
    if (!dimension) return {} as any;

    const result = sizes.map(x => ({ [x]: this.sizeOf(dimension, x) }));
    return Object.assign({}, ...result);
  }

  /**
   * Return a single width & height object based on size (large, medium, small, extra small)
   */
  private sizeOf(dimension: string, size: Size) {
    const [width, height] = dimension
      .split('x')
      .map(x => Math.ceil(+x / (this.SIZES.get(size) || 1)));
    return { width, height };
  }

  /**
   * Resize image using `sharp` library
   * @see https://sharp.pixelplumbing.com/api-resize
   */
  private sharpResize(src: string, dest: string, opt: sharp.ResizeOptions) {
    if (!opt) return '';

    const { width, height } = opt;
    return new Promise((resolve, reject) => {
      const readableStream = createReadStream(src);
      const writableStream = createWriteStream(dest);
      readableStream
        .pipe(
          sharp()
            .resize(width, height, { fit: 'outside' })
            .on('end', () => resolve(dest))
            .on('error', e => reject(e))
        )
        .pipe(writableStream);
    });
  }
}
