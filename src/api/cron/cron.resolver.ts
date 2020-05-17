import { Injectable } from '@nestjs/common';
import { readdir, stat, unlink } from 'fs';
import * as moment from 'moment';
import { resolve } from 'path';

@Injectable()
export class CronResolver {
  /**
   * NOTE: For Cron Job Only !!!
   * Delete any files older than (x) days
   */
  removeFiles(path: string, days = 1) {
    readdir(path, (err, files) => {
      files.forEach(file => {
        const filePath = resolve(path, file);
        stat(filePath, (err, stat) => {
          if (err) return;
          const d = moment().diff(moment(stat.mtime), 'days');
          if (d > days) unlink(filePath, () => console.log(`${file} delete`));
        });
      });
    });
  }
}
