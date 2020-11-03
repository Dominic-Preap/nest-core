import { AddWorksheetOptions, Column, PaperSize, Workbook, Worksheet } from 'exceljs';
import { Response } from 'express';
import { Stream } from 'stream';

export interface ExcelDocumentOption {
  sheetName: string;
  columns: Partial<Column>[];
  rows: any[][];
}

interface ReadOption {
  sheetName: string;
  data: { [key: string]: string };
}

export class ExcelDocument {
  wb: Workbook;

  // =================================
  // WorksheetOption
  // =================================
  private worksheetOption: Partial<AddWorksheetOptions> = {
    pageSetup: {
      firstPageNumber: 1,
      orientation: 'landscape',
      pageOrder: 'downThenOver',
      paperSize: PaperSize.A4,
      horizontalCentered: true,
      margins: {
        bottom: 0.5,
        footer: 0.3,
        header: 0.3,
        left: 0.45,
        right: 0.45,
        top: 0.5
      }
    }
  };

  constructor(private readonly option: ExcelDocumentOption) {
    this.wb = new Workbook();
    this.createSheet(this.option);
  }

  createSheet(option: ExcelDocumentOption) {
    const { columns, rows, sheetName } = option;
    const headerNames = columns.map(x => x.header as string);

    const ws = this.wb.addWorksheet(sheetName, this.worksheetOption);
    ws.views = [{ state: 'frozen', ySplit: 1 }];
    ws.columns = columns.map(x => ({
      ...x,
      width: x.width || 15,
      style: { alignment: { horizontal: 'left', vertical: 'middle' }, ...x.style }
    })) as any; // TODO: will verify again
    this.setTable(ws, sheetName, headerNames, rows);
  }

  write(fileName: string, res: Response) {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    this.wb.xlsx.write(res, { zip: { compression: 'DEFLATE' } }).then(() => res.end());
  }

  private setTable(ws: Worksheet, sheetName: string, columnNames: string[], rows: any[][]) {
    return ws.addTable({
      name: sheetName,
      ref: 'A1',
      headerRow: true,
      style: { theme: 'TableStyleMedium2', showRowStripes: true },
      columns: columnNames.map(x => ({ name: x, filterButton: true })),
      rows
    });
  }

  // =================================
  // STATIC HELPER FUNCTIONS
  // =================================

  static async readStream<T = any>(stream: Stream, opt: ReadOption): Promise<T[]> {
    const workbook = new Workbook();
    await workbook.xlsx.read(stream);
    return this.read(workbook, opt);
  }

  static async readFile<T = any>(fileName: string, opt: ReadOption): Promise<T[]> {
    const workbook = new Workbook();
    await workbook.xlsx.readFile(fileName);
    return this.read(workbook, opt);
  }

  private static async read(workbook: Workbook, opt: ReadOption) {
    const worksheet = workbook.getWorksheet(opt.sheetName);
    const rowHeaders = worksheet.getRow(1).values as string[]; // Get Worksheet Header

    /**
     * Checking rowHeaders and convert into index base headers object
     * const headers = {
     *   1: id,
     *   2: name,
     *   3: age
     * }
     */
    const headers: { [index: number]: string } = {};
    for (const [key, value] of Object.entries(opt.data)) {
      const x = rowHeaders.findIndex(x => x === value);
      headers[x] = key;
    }

    const result: any[] = [];
    worksheet.eachRow(row => {
      // Convert row.values in to array object by comparing row index to headers object above
      // then merge it together using Object.Assign()
      //
      // ? before => values = [1, 'John Doe', 34];
      // ? after  => values = [{ id: 1 }, { name: 'John Doe' }, { age: 34 }];

      const values = (row.values as any[]).map((item, i) => ({ [headers[i]]: item }));
      result.push(Object.assign({}, ...values));
    });

    // ! Remove header from result
    result.shift();
    return result;
  }
}
