import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { ExcelDocument } from '@common';

@Injectable()
export class ExcelJSService {
  async start(res: Response) {
    // ====================================================
    // Create a new instance of a ExcelDocument class
    // ====================================================
    const excel = new ExcelDocument({
      sheetName: 'Report',
      columns: [
        // ---
        { header: 'Id' },
        { header: 'Name', width: 30 },
        { header: 'Created Date', width: 20, style: { numFmt: 'dd-mmm-yyyy hh:mm AM/PM' } }
      ],
      rows: data1().map(x => [x.id, x.name, x.createdAt])
    });

    // ====================================================
    // Create Second Sheet for the Excel File
    // ====================================================
    excel.createSheet({
      sheetName: 'Products',
      columns: [{ header: 'Month' }, { header: 'Total QTY', style: { numFmt: '0.00%' } }],
      rows: data2().map(x => [x.week, x.total])
    });

    excel.write('Report.xlsx', res);
  }
}

const data1 = () =>
  new Array(100).fill(0).map((x, i) => ({ id: ++i, name: 'Testing', createdAt: new Date() }));
const data2 = () =>
  new Array(60000).fill(0).map((x, i) => ({ week: `Week ${++i}`, total: ++i * 2 }));
