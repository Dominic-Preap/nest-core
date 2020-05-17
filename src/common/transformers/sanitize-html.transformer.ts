/*
|*****************************************************************************************************
| EXPLANATION:
|*****************************************************************************************************
| decode4(v) decode5(v)
|   First we use decode to covert special HTML characters in order to filter out XSS.
|   Need to run these both functions, filter out HTML4 & HTML5
|
|   Example :
|       &lt;script&gt;&lt;svg onload=alert(10114)width=100&gt;&lt;/script&gt;
|       \&lt;/script\&gt;\&lt;svg/onload=alert(10114) width=100\/&gt;
|
|   Return  : <script><svg onload=alert('hello') width=100></script>
|-----------------------------------------------------------------------------------------------------
| sanitizeHtml(x, options)
|   finally remove any unwanted HTML attributes and tags
|
|   Example : <body><div>message</div><script><svg onload=alert('hello') width=100></script></body>
|   Return  : <div>message</div>
|
|*****************************************************************************************************
*/

import { Transform } from 'class-transformer';
import { Html4Entities, Html5Entities } from 'html-entities';
import * as sanitizeHtml from 'sanitize-html';

const { decode: decode4 } = new Html4Entities();
const { decode: decode5 } = new Html5Entities();
const defaultOptions: sanitizeHtml.IOptions = {
  allowedAttributes: {
    '*': ['style', 'class', 'href', 'src']
  }
};

/**
 * cleaning up HTML fragments such as those created by ckeditor and other rich text editors
 *
 * @see https://www.npmjs.com/package/sanitize-html
 * @see https://www.npmjs.com/package/html-entities
 */
export const TransformToSanitizeHtml = (option?: sanitizeHtml.IOptions) =>
  Transform(v => sanitizeHtml(decode5(decode4(v)), { ...defaultOptions, ...option }));
