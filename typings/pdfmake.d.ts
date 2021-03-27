// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31011

declare module 'pdfmake' {
  import { EventEmitter } from 'events';

  namespace pdfmake {
    type Alignment = 'left' | 'right' | 'justify' | 'center';
    type Background = string | ContentProperties | Contents;
    type BackgroundFunction = (currentPage: number, pageSize: number) => Background;
    type HeaderFooter = string | ContentProperties | Contents;
    type HeaderFooterFunction = (
      currentPage: number,
      pageCount: number,
      pageSize: number
    ) => HeaderFooter;
    type ListType =
      | 'square'
      | 'circle'
      | 'lower-alpha'
      | 'upper-alpha'
      | 'lower-roman'
      | 'upper-roman'
      | 'none';
    type Margin = number | [number, number] | [number, number, number, number];
    type TableLayout = 'lightHorizontalLines' | 'headerLineOnly' | 'noBorders';
    type Width = 'auto' | '*' | string | number;

    type PageOrientation = 'landscape' | 'portrait';
    type PageSize = PageSizeType | { width: number; height: number };
    type PageSizeType =
      | '4A0'
      | '2A0'
      | 'A0'
      | 'A1'
      | 'A2'
      | 'A3'
      | 'A4'
      | 'A5'
      | 'A6'
      | 'A7'
      | 'A8'
      | 'A9'
      | 'A10'
      | 'B0'
      | 'B1'
      | 'B2'
      | 'B3'
      | 'B4'
      | 'B5'
      | 'B6'
      | 'B7'
      | 'B8'
      | 'B9'
      | 'B10'
      | 'C0'
      | 'C1'
      | 'C2'
      | 'C3'
      | 'C4'
      | 'C5'
      | 'C6'
      | 'C7'
      | 'C8'
      | 'C9'
      | 'C10'
      | 'RA0'
      | 'RA1'
      | 'RA2'
      | 'RA3'
      | 'RA4'
      | 'SRA0'
      | 'SRA1'
      | 'SRA2'
      | 'SRA3'
      | 'SRA4'
      | 'EXECUTIVE'
      | 'FOLIO'
      | 'LEGAL'
      | 'LETTER'
      | 'TABLOID';

    interface Information {
      /**
       * the title of the document
       */
      title?: string;
      /**
       * the name of the author
       */
      author?: string;
      /**
       * the subject of the document
       */
      subject?: string;
      /**
       * keywords associated with the document
       */
      keywords?: string;
      /**
       * the creator of the document (default is 'pdfmake'|
       */
      creator?: string;
      /**
       * the producer of the document (default is 'pdfmake'|
       */
      producer?: string;
      /**
       * the date the document was created (added automatically by pdfmake)
       */
      creationDate?: string;
      /**
       * the date the document was last modified
       */
      modDate?: string;
      /**
       * the trapped flag in a PDF document indicates whether the document has been “trapped”, i.e. corrected for slight color misregistrations
       */
      trapped: any;
      /**
       * TODO: a string value specifying PDF file version
       */
      pdfVersion?: '1.3' | '1.4' | '1.5' | '1.6' | '1.7' | '1.7ext3';
    }

    interface Permissions {
      /**
       * whether printing is allowed. Specify `lowResolution` to allow degraded printing, or `highResolution` to allow printing with high resolution
       */
      printing?: 'highResolution' | 'lowResolution';
      /**
       * whether modifying the file is allowed. Specify `true` to allow modifying document content
       */
      modifying?: boolean;
      /**
       * whether copying text or graphics is allowed. Specify `true` to allow copying
       */
      copying?: boolean;
      /**
       * whether annotating, form filling is allowed. Specify `true` to allow annotating and form filling
       */
      annotating?: boolean;
      /**
       * whether form filling and signing is allowed. Specify `true` to allow filling in form fields and signing
       */
      fillingForms?: boolean;
      /**
       * whether copying text for accessibility is allowed. Specify `true` to allow copying for accessibility
       */
      contentAccessibility?: boolean;
      /**
       * whether assembling document is allowed. Specify `true` to allow document assembly
       */
      documentAssembly?: boolean;
    }

    // interface TableCell {
    //   text: string;
    //   rowSpan?: number;
    //   colSpan?: number;
    //   fillColor?: string;
    //   border?: [boolean, boolean, boolean, boolean];
    // }

    interface TableLayoutFunctions {
      defaultBorder?: boolean;
      hLineWidth?: (i: number, node: any) => number;
      vLineWidth?: (i: number, node: any) => number;
      hLineColor?: (i: number, node: any) => string;
      vLineColor?: (i: number, node: any) => string;
      fillColor?: (rowIndex: number, node: any, columnIndex: number) => string;
      paddingLeft?: (i: number, node: any) => number;
      paddingRight?: (i: number, node: any) => number;
      paddingTop?: (i: number, node: any) => number;
      paddingBottom?: (i: number, node: any) => number;
      hLineStyle?: (i: number, node: any) => { dash: { length?: number; space?: number } };
      vLineStyle?: (i: number, node: any) => { dash: { length?: number; space?: number } };
    }

    interface Table {
      /**
       *  headers are automatically repeated if the table spans over multiple pages
       */
      headerRows?: number;
      widths?: Width[];
      body: Contents[] | Contents[][];

      // TODO
      // dontBreakRows: true,
      // heights?: Array<string | number> | TableRowFunction;
      // keepWithHeaderRows: 1,
    }

    // ======================================

    interface TableOfContent {
      id?: string;
      title: ContentProperties;
      textMargin?: Margin;
      textStyle?: Style;
      numberStyle?: Style;
    }

    type Styles = { [name: string]: Style };
    interface Style {
      alignment?: Alignment; // ?
      background?: any; // !
      bold?: boolean; // ?
      characterSpacing?: number; // !
      color?: string; // ?
      // columnGap?: any; // !
      decoration?: 'underline' | 'lineThrough' | 'overline'; // ?
      decorationColor?: string; // ?
      decorationStyle?: 'dashed' | 'dotted' | 'double' | 'wavy'; // ?
      fillColor?: string; // ?
      font?: any; // !
      fontFeatures?: string[]; // ! ! smcp | c2sc | onum
      fontSize?: number; // ?
      italics?: boolean; // ?
      leadingIndent?: any; // !
      lineHeight?: number; // ?
      margin?: Margin; // ?
      markerColor?: string; // ?
      noWrap?: boolean; // !
      opacity?: number; // ?
      // ---
      preserveLeadingSpaces?: boolean; // ?
      pageBreak?: 'before' | 'after'; // ?
      pageOrientation?: PageOrientation; // ?
    }

    interface Canvas {
      type?: string;
      x?: number;
      x1?: number;
      x2?: number;
      y?: number;
      y1?: number;
      y2?: number;
      w?: number;
      h?: number;
      r?: number;
      r1?: number;
      r2?: number;
      fillOpacity?: number;
      dash?: { length?: number; space?: number };
      lineCap?: string;
      lineColor?: string;
      lineWidth?: number;
      linearGradient?: string[];
      color?: string;
      closePath?: boolean;
      points?: { x: number; y: number }[];
    }

    type Content = number | string | ContentProperties | (string | ContentProperties)[];
    type Contents = Content[];

    interface ContentProperties extends Style {
      // #########################################################
      // MAIN
      // #########################################################
      text?: string | Contents;
      style?: string | string[] | Style;

      id?: string;
      pageReference?: string; // !
      textReference?: string; // !
      canvas?: Canvas[];

      // #########################################################
      // LISTS
      // #########################################################
      /**
       * ul: bulleted lists
       */
      ul?: Contents;
      /**
       * ol: numbered list
       */
      ol?: Contents;
      /**
       * make your own complex separator
       * @example: `)` => 1) | `['(', ')']` => (1)
       */
      separator?: string | [string, string];
      /**
       * list with own items type
       */
      listType?: ListType;
      /**
       * list marker type
       */
      type?: ListType;

      start?: number;
      counter?: number;
      reversed?: boolean;

      // #########################################################
      // TABLES
      // #########################################################
      /**
       * Use a pre define layout or make your own table layouts
       */
      layout?: TableLayout | TableLayoutFunctions;
      /**
       * table have headers, borders and cells spanning over multiple columns/rows.
       */
      table?: Table;

      rowSpan?: number;
      colSpan?: number;
      fillColor?: string;
      border?: [boolean, boolean, boolean, boolean];

      // #########################################################
      // COLUMNS
      // #########################################################
      /**
       *
       */
      columns?: Contents;

      /**
       * `*`     : star-sized columns fill the remaining space.
       * `auto`  : auto-sized columns have their widths based on their content.
       * `number`: fixed width. eg: `100`.
       * `string`: % width. eg: `20%`.
       */
      // width?: Width;

      /**
       * optional space between columns
       */
      columnGap?: number;

      // #########################################################
      // STACK OF PARAGRAPHS
      // #########################################################
      /**
       * collection of content that we can use to restyle the whole stack,
       */
      stack?: Contents;

      // #########################################################
      // IMAGES
      // #########################################################
      /**
       * can be `data:image/jpeg...` or reference it by name or virtual file system
       * if no width/height/fit is provided, the original size will be used
       */
      image?: string;

      /**
       * fit the image inside a rectangle
       */
      fit?: number | [number, number];

      /**
       * if you specify both width and height - image will be stretched
       */
      height?: string | number;

      /**
       * if you specify width, image will scale proportionally
       */
      width?: string | number;

      /**
       * set absolute position on image
       */
      absolutePosition?: { x: number; y: number };

      // #########################################################
      // LINKS
      // #########################################################
      /**
       * external links to any website. eg: `'http://google.com'`
       */
      link?: string;
      /**
       * internal links to specific page
       */
      linkToPage?: number;

      // #########################################################
      // QR CODE
      // #########################################################
      /**
       * text in QR code
       */
      qr?: string;

      /**
       * foreground (optional)
       */
      foreground?: string;

      /**
       * background (optional)
       */
      background?: string;

      /**
       * version (optional)
       */
      version?: string;
      /**
       * eccLevel (optional, default L) - possible values: L, M, Q, H
       */
      eccLevel?: 'L' | 'M' | 'Q' | 'H';
      /**
       * mode (optional) - possible values: numeric, alphanumeric, octet
       */
      mode?: 'numeric' | 'alphanumeric' | 'octet';
      /**
       * mask (optional)
       */
      mask?: string;

      // #########################################################
      // TABLE OF CONTENTS
      // #########################################################
      /**
       * text in QR code
       */
      toc?: TableOfContent;

      /**
       * tocItem can be boolean
       * or tocItem: `mainToc` if is used id in toc
       * or tocItem: [`mainToc`, `subToc`] for multiple tocs
       */
      tocItem?: boolean | string | string[];
      tocStyle?: Style;
      tocMargin?: Margin;
      tocNumberStyle?: Style;
    }

    interface TDocumentDefinitions {
      /**
       * ! Important: all of your document content will be add in here
       */
      content: Contents;
      /**
       * The background-layer will be added on every page.
       */
      background?: Background | BackgroundFunction;
      /**
       * Define a Style dictionary for reusable
       */
      styles?: Styles;
      /**
       * Define default style
       */
      defaultStyle?: Style;
      /**
       * Define images dictionary and should reference it by name
       */
      images?: { [name: string]: string };

      // #########################################################
      // PAGE SETUP
      // #########################################################
      /**
       * Page headers can be: `static` or `dynamic`.
       */
      header?: HeaderFooter | HeaderFooterFunction;
      /**
       * Page footers can be: `static` or `dynamic`.
       */
      footer?: HeaderFooter | HeaderFooterFunction;
      /**
       * a string or { width: number, height: number }
       */
      pageSize?: PageSize;
      /**
       * By default we use `portrait`, you can change it to `landscape` if you wish
       */
      pageOrientation?: PageOrientation;
      /**
       * [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
       */
      pageMargins?: Margin;

      /**
       * watermark your page
       */
      watermark?: string | Content;

      // #########################################################
      // MISC
      // #########################################################
      /**
       * Document can have various metadata associated with them
       */
      info?: Information;
      /**
       * Compression of PDF is enabled by default, use compress `false` for disable
       */
      compress?: boolean;
      /**
       * The user password (string value)
       */
      userPassword?: string;
      /**
       * The owner password (string value)
       */
      ownerPassword?: string;
      /**
       * The object specifying PDF file permissions
       */
      permissions?: Permissions;
      /**
       * TODO: function can be specified, which can determine if a page break should be inserted before a node
       */
      pageBreakBefore?(
        currentNode,
        followingNodesOnPage,
        nodesOnNextPage,
        previousNodesOnPage
      ): boolean;
    }

    interface TFontFamily {
      [fontName: string]: any;
    }
  }

  class pdfmake {
    constructor(font: pdfmake.TFontFamily);
    createPdfKitDocument(documentDefinitions: pdfmake.TDocumentDefinitions): CreatePdfKitDocument;
  }

  class CreatePdfKitDocument extends EventEmitter {
    on(event: 'data', listener: (b: Buffer) => void): this;
    on(event: 'end', listener: () => void): this;
    end(): void;
  }

  export = pdfmake;
}
