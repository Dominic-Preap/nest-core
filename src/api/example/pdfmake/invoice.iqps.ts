import * as moment from 'moment-timezone';
import { Content, Contents, Style, Styles, TDocumentDefinitions } from 'pdfmake';

export class InvoiceDocument {
  private invoices: Invoice[] = [];

  private readonly styles: Styles = {
    //
    title: {
      alignment: 'center',
      bold: true,
      font: 'KhmerOSmuollight',
      fontSize: 12,
      italics: true,
      margin: [0, 0, 0, 10]
    },
    //
    informationKey: { margin: [-3, -2], bold: true },
    informationValue: { margin: [-3, -2] },

    //
    tableHeaderMargin: { margin: [0, 4, 0, 0] },
    tableHeaderMarginDouble: { margin: [0, 8, 0, 0] },
    tableHeader: {
      bold: true,
      alignment: 'center',
      fillColor: '#D2E6F6'
    },
    totalAmountCell: {
      alignment: 'right',
      bold: true,
      fillColor: '#D2E6F6'
    },

    //
    signature: {
      font: 'KhmerOSmuollight',
      alignment: 'center'
    }
  };

  private readonly defaultStyle: Style = {
    color: '#222',
    font: 'Hanuman',
    fontSize: 8
  };

  private get contentTitle(): Content {
    return { text: 'វិក្ត័យបត្រ័', style: 'title' };
  }

  private get contentSignature(): Content {
    return {
      layout: 'noBorders',
      margin: [5, 15, 5, 0],
      table: {
        widths: ['*', '*'],
        body: [
          [
            { text: 'ហត្ថលេខាអ្នកដឹក', style: 'signature' },
            { text: 'ហត្ថលេខាម្ចាស់ហាង', style: 'signature' }
          ]
        ]
      }
    };
  }

  setInvoice(invoice: Invoice) {
    this.invoices.push(invoice);
  }

  getDefinition(): TDocumentDefinitions {
    const contents: Contents = [];

    let i = 1;
    for (const invoice of this.invoices) {
      const contentInformation = this.getInformation(invoice);
      const contentItemsTable = this.getItemsTable(invoice.products, invoice.totalAmount);
      const contentPageBreak: Content = {
        text: '',
        pageBreak: i !== this.invoices.length ? 'before' : undefined
      };

      contents.push(
        ...[
          this.contentTitle,
          contentInformation,
          contentItemsTable,
          this.contentSignature,
          contentPageBreak
        ]
      );
      i++;
    }

    return {
      content: contents,
      defaultStyle: this.defaultStyle,
      pageMargins: [10, 15, 10, 10],
      pageOrientation: 'landscape',
      pageSize: 'A5',
      styles: this.styles,
      watermark: { text: 'IQPS', opacity: 0.1, bold: true, italics: false }
    };
  }

  // ###################################################
  // INVOICE INFORMATION
  // ###################################################

  private getInformation(i: Invoice): Content {
    return {
      layout: 'noBorders',
      margin: [5, 0, 5, 15],
      table: {
        widths: ['auto', '*', 'auto', '*', 'auto', '*', 'auto', '*'],
        body: [
          // =================================================
          // FIRST ROW
          // =================================================
          [
            ...this.setInformationKeyValuePair('កូដអតិថិជន', i.customerCode),
            ...this.setInformationKeyValuePair('ឈ្មោះដេប៉ូ', i.distributorName),
            ...this.setInformationKeyValuePair('ឈ្មោះអ្នកលក់', i.saleRepName),
            ...this.setInformationKeyValuePair('Inv.No', i.invoiceNo)
          ],
          // =================================================
          // SECOND ROW
          // =================================================
          [
            ...this.setInformationKeyValuePair('ឈ្មោះ', i.customerName),
            ...this.setInformationKeyValuePair('', ''),
            ...this.setInformationKeyValuePair('', ''),
            ...this.setInformationKeyValuePair('ថ្ងៃទិញ', i.orderedDate as any)
          ],
          // =================================================
          // THIRD ROW
          // =================================================
          [
            ...this.setInformationKeyValuePair('អាស័យដ្ឋាន', i.outletAddress),
            ...this.setInformationKeyValuePair('អាស័យដ្ឋាន', i.distributorAddress),
            ...this.setInformationKeyValuePair('', ''),
            ...this.setInformationKeyValuePair('ថ្ងៃដឹក', i.deliveryDate as any)
          ],
          // =================================================
          // FORTH ROW
          // =================================================
          [
            ...this.setInformationKeyValuePair('ទូរស័ព្ទលេខ', i.customerPhone),
            ...this.setInformationKeyValuePair('ទូរស័ព្ទលេខ', i.distributorPhone),
            ...this.setInformationKeyValuePair('ទូរស័ព្ទលេខ', i.saleRepPhone),
            ...this.setInformationKeyValuePair('សារអ្នកដឹក', '')
          ]
        ]
      }
    };
  }

  private setInformationKeyValuePair(key: string, value: string | Date) {
    const v =
      typeof value !== 'string'
        ? moment.tz(value, 'Asia/Phnom_Penh').locale('km-KH').format('DD-MMMM-YYYY')
        : value;

    return [
      {
        style: 'informationKey',
        text: key
      },
      {
        style: 'informationValue',
        text: v
      }
    ];
  }

  // ###################################################
  // INVOICE ORDER ITEMS TABLE
  // ###################################################

  private getItemsTable(products: Product[], totalAmount: number): Content {
    const emptyCell: Content = {
      text: '',
      fillColor: 'white',
      border: [false, false, false, false]
    };

    return {
      table: {
        widths: ['auto', '*', 33, 35, 40, 40, 40, 40],
        body: [
          [
            { style: ['tableHeader', 'tableHeaderMarginDouble'], rowSpan: 2, text: 'No' },
            { style: ['tableHeader', 'tableHeaderMarginDouble'], rowSpan: 2, text: 'ឈ្មោះផលិតផល' },
            { style: 'tableHeader', colSpan: 2, text: 'បរិមាណ' },
            {},
            { style: ['tableHeader', 'tableHeaderMarginDouble'], rowSpan: 2, text: 'ថ្លៃលក់' },
            { style: ['tableHeader', 'tableHeaderMarginDouble'], rowSpan: 2, text: 'តម្លៃបញ្ចុះ' },
            { style: ['tableHeader', 'tableHeaderMargin'], rowSpan: 2, text: 'តម្លៃក្រោយ\nបញ្ចុះ' },
            { style: ['tableHeader', 'tableHeaderMarginDouble'], rowSpan: 2, text: 'តម្លៃសរុប​' }
          ],
          [
            {},
            {},
            { style: 'tableHeader', text: 'កេស' },
            { style: 'tableHeader', text: 'ដប/កំប៉ុង' }
          ],

          // ! Important
          ...this.getItemsTableRow(products),

          [
            emptyCell,
            {
              text: [
                { text: '(*) ', preserveLeadingSpaces: true, color: 'red', font: 'Roboto' },
                { text: ': ផលិតផលមិនគិតថ្លៃ' }
              ],
              bold: true,
              fillColor: 'yellow',
              border: [false, false, false, false]
            },
            emptyCell,
            emptyCell,
            {
              colSpan: 3,
              border: [true, true, true, true],
              text: 'ចំនួនទឹកប្រាក់ត្រូវបង់​​',
              style: 'totalAmountCell'
            },
            {},
            {},
            { text: this.setCurrencyFormat(totalAmount), style: 'totalAmountCell' }
          ]
        ]
      },
      layout: {
        hLineWidth: () => 0.5,
        vLineWidth: () => 0.5,
        hLineColor: () => 'grey',
        vLineColor: () => 'grey',
        fillColor: i => (i % 2 ? '#f3f3f3' : '')
        // hLineStyle: () => ({ dash: { length: 1 } }),
        // vLineStyle: () => ({ dash: { length: 1 } }),
      }
    };
  }

  private getItemsTableRow(products: Product[]) {
    return products.map(
      (x, i) =>
        [
          { text: i + 1, alignment: 'center' },
          {
            text: [
              { text: x.name },
              {
                text: x.promotion ? ' (*)' : '',
                color: 'red',
                font: 'Roboto',
                preserveLeadingSpaces: true
              }
            ]
          },
          { text: x.CA, alignment: 'center' },
          { text: x.ES, alignment: 'center' },
          { text: this.setCurrencyFormat(x.unitPrice), alignment: 'right' },
          { text: this.setCurrencyFormat(x.discountPrice), alignment: 'right' },
          { text: this.setCurrencyFormat(x.afterDiscountPrice), alignment: 'right' },
          { text: this.setCurrencyFormat(x.totalAmount), alignment: 'right' }
        ] as Content[]
    );
  }

  private setCurrencyFormat = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export interface Invoice {
  // ---------------------------
  customerCode: string;
  customerName: string;
  outletAddress: string;
  customerPhone: string;
  // ---------------------------
  distributorName: string;
  distributorAddress: string;
  distributorPhone: string;
  // ---------------------------
  saleRepName: string;
  saleRepPhone: string;
  // ---------------------------
  invoiceNo: string;
  orderedDate: Date;
  deliveryDate: Date;
  driverMessage: string;
  // ---------------------------
  products: Product[];
  totalAmount: number;
}

export interface Product {
  name: string;
  promotion: boolean;
  ES: number;
  CA: number;
  unitPrice: number;
  discountPrice: number;
  afterDiscountPrice: number;
  totalAmount: number;
}
