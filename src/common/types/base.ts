/*
|--------------------------------------------------------------------------
| References
|--------------------------------------------------------------------------
| https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
| https://stackoverflow.com/questions/44154009/get-array-of-string-literal-type-values
|
*/

export type Lit = string | number | boolean | undefined | null | void;
export const tuple = <T extends Lit[]>(...args: T) => args;
