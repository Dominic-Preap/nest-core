import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { resolve } from 'path';

import { PDFMake } from '@common';

import { Invoice, InvoiceDocument, Product } from './invoice.iqps';

const products: Product[] = [
  {
    name: 'Big Cola 3.1L 6 Bottles',
    promotion: false,
    ES: 6,
    CA: 4,
    unitPrice: 10,
    discountPrice: 30,
    afterDiscountPrice: 28,
    totalAmount: 200
  },
  {
    name: 'Big Fanta 1L 6 Bottles',
    promotion: false,
    ES: 6,
    CA: 4,
    unitPrice: 10,
    discountPrice: 30,
    afterDiscountPrice: 28,
    totalAmount: 200
  },
  {
    name: 'Fanta 330ml RGB',
    promotion: true,
    ES: 6,
    CA: 4,
    unitPrice: 90,
    discountPrice: 150,
    afterDiscountPrice: 650,
    totalAmount: 800
  }
];
const invoice: Invoice = {
  // ---------------------------
  customerCode: '10000085',
  customerName: 'ព្រាប ច័ន្ទឧត្តម',
  outletAddress: 'ផ្ទះលេខ 25 ផ្លូវ 577',
  customerPhone: '012-631-445',
  // ---------------------------
  distributorName: 'សាន សុខមេត្តា',
  distributorAddress: 'ផ្ទះលេខ 17E0 ផ្លូវ 158',
  distributorPhone: '010-745-374',
  // ---------------------------
  saleRepName: 'សម្បត្តិ មន្នីនាត',
  saleRepPhone: '012-985-4785',
  // ---------------------------
  invoiceNo: '451-89842418',
  orderedDate: new Date(),
  deliveryDate: new Date(),
  driverMessage: '',
  // ---------------------------
  products,
  totalAmount: 85230.85
};

@Injectable()
export class PdfMakeService {
  download(res: Response) {
    const template = new InvoiceDocument();
    template.setInvoice(invoice);
    PDFMake.download({ filename: 'invoice.pdf', document: template.getDefinition() }, res);
  }

  getDataUrl(res: Response) {
    const template = new InvoiceDocument();
    template.setInvoice(invoice);
    PDFMake.getDataUrl(template.getDefinition(), res);
  }

  writeFile(res: Response) {
    const template = new InvoiceDocument();
    template.setInvoice(invoice);
    PDFMake.writeFile(template.getDefinition(), resolve('.', 'public', 'invoice.pdf'));
    res.send({ message: 'ok' });
  }
}
