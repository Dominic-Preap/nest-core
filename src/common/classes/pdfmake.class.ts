import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { TDocumentDefinitions } from 'pdfmake';
// tslint:disable-next-line:no-duplicate-imports
import * as Pdfmake from 'pdfmake'; // ! Warning: do not use "Alt + Shift + O" for organize import

/*
|--------------------------------------------------------------------------
| References
|--------------------------------------------------------------------------
| https://github.com/bpampuch/pdfmake/issues/489
| https://github.com/bpampuch/pdfmake/issues/910
| https://stackoverflow.com/questions/28568816/express-js-how-to-download-base64-string-as-pdf-file
| https://stackoverflow.com/questions/37816542/output-pdf-using-stream
| https://medium.com/@kainikhil/nodejs-how-to-generate-and-properly-serve-pdf-6835737d118e
|
*/

const fontPath = (font: string) => path.resolve('.', 'assets', 'fonts', font);

export class PDFMake {
  static download(opt: { filename: string; document: TDocumentDefinitions }, res: Response) {
    const { filename, document } = opt;
    this.createPdf(document, result => {
      res.setHeader('Content-Length', result.length);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(result); // Buffer data
    });
  }

  static getDataUrl(document: TDocumentDefinitions, res: Response) {
    this.createPdf(document, result => {
      const response = 'data:application/pdf;base64,' + result.toString('base64');
      res.send(response); // sends a base64 encoded string to client
    });
  }

  static getBase64(document: TDocumentDefinitions, res: Response) {
    this.createPdf(document, result => res.send(result.toString('base64'))); // sends a base64 encoded string to client
  }

  static writeFile(document: TDocumentDefinitions, filename: string) {
    this.createPdf(document, result =>
      fs.writeFile(filename, result, err => console.log(`write file ${filename}`, err))
    );
  }

  private static fonts = {
    Roboto: {
      normal: fontPath('Roboto-Regular.ttf'),
      bold: fontPath('Roboto-Medium.ttf'),
      italics: fontPath('Roboto-Italic.ttf'),
      bolditalics: fontPath('Roboto-Italic.ttf')
    },
    Hanuman: {
      normal: fontPath('Hanuman-Regular.ttf'),
      bold: fontPath('Hanuman-Bold.ttf'),
      italics: fontPath('Hanuman-Regular.ttf'),
      bolditalics: fontPath('Hanuman-Bold.ttf')
    },
    KhmerOSmuollight: {
      normal: fontPath('KhmerOSmuollight.ttf'),
      bold: fontPath('KhmerOSmuollight.ttf'),
      italics: fontPath('KhmerOSmuollight.ttf'),
      bolditalics: fontPath('KhmerOSmuollight.ttf')
    }
  };

  private static createPdf(document: TDocumentDefinitions, callback: (result: Buffer) => void) {
    const chunks: Buffer[] = [];

    // Call instance of pdfmake with fonts parameter
    const pdfmake = new Pdfmake(this.fonts);
    const doc = pdfmake.createPdfKitDocument(document);

    // Listen to event and get chunks
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => callback(Buffer.concat(chunks)));
    doc.end(); // Don't forget to close the event after everything done
  }
}
