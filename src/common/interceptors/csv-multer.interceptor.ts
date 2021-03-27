import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import * as fs from 'fs';
import * as mime from 'mime-types';
import * as multer from 'multer';
import * as path from 'path';
import * as shell from 'shelljs';
import * as uuid from 'uuid';

// https://github.com/expressjs/multer/issues/170#issuecomment-123362345
// https://github.com/expressjs/multer/issues/114#issuecomment-231591339

const destination = path.resolve('.', 'public', 'upload', 'csv');
const allowedExtensions: any = ['csv', 'xls', 'xlsx'];
export const CSVMulterOption: MulterOptions = {
  dest: destination,
  limits: {
    files: 1, // max number of files
    fileSize: 5 * 1024 * 1024 // 5 mb
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, destination),
    filename: (req, file, cb) =>
      cb(null, `${uuid.v4().replace(/-/g, '')}${path.extname(file.originalname)}`) // mime.extension(file.mimetype)
  }),
  fileFilter: (req: Request, file, cb) => {
    if (!fs.existsSync(destination)) shell.mkdir('-p', destination);
    if (!allowedExtensions.includes(mime.extension(file.mimetype))) {
      return cb(new BadRequestException('Extension not allowed'), false);
    }
    return cb(null, true);
  }
};
