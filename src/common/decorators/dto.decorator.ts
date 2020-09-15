import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested
} from 'class-validator';

import { TransformTrimString } from '../transformers/string.transformer';
import { IsNotBlank } from '../validators/is-not-blank.validator';

// ===========================================
// OPTIONAL
// ===========================================
export const IsOptionalArrayNumber  = () => applyDecorators(IsOptional(), ApiPropertyOptional({ type: Number, isArray: true }), IsArray(), IsNumber({}, { each: true })); // prettier-ignore
export const IsOptionalBoolean      = () => applyDecorators(IsOptional(), ApiPropertyOptional(), IsBoolean()); // prettier-ignore
export const IsOptionalDateString   = () => applyDecorators(IsOptional(), ApiPropertyOptional({ type: String, format: 'date-time' }), IsDateString()); // prettier-ignore
export const IsOptionalEmail        = () => applyDecorators(IsOptional(), ApiPropertyOptional(), IsEmail({}, { message: 'Please provide a valid email address.' })); // prettier-ignore
export const IsOptionalEnum = (e: any)   => applyDecorators(IsOptional(), ApiPropertyOptional({ type: String, enum: e }), IsEnum(e)); // prettier-ignore
export const IsOptionalIn   = (e: any[]) => applyDecorators(IsOptional(), ApiPropertyOptional({ type: String, enum: e }), IsIn(e)); // prettier-ignore
export const IsOptionalNumber       = () => applyDecorators(IsOptional(), ApiPropertyOptional(), IsNumber()); // prettier-ignore
export const IsOptionalString       = () => applyDecorators(IsOptional(), ApiPropertyOptional(), IsString()); // prettier-ignore
export const IsOptionalUrl          = () => applyDecorators(IsOptional(), ApiPropertyOptional(), IsUrl()); // prettier-ignore

// ===========================================
// NOT EMPTY
// ===========================================
export const IsNotEmptyArrayNumber  = () => applyDecorators(IsNotEmpty(), ApiProperty({ type: Number, isArray: true }), IsArray(), IsNumber({}, { each: true })); // prettier-ignore
export const IsNotEmptyBoolean      = () => applyDecorators(IsNotEmpty(), ApiProperty(), IsBoolean()); // prettier-ignore
export const IsNotEmptyDateString   = () => applyDecorators(IsNotEmpty(), ApiProperty({ type: String, format: 'date-time' }), IsDateString()); // prettier-ignore
export const IsNotEmptyEmail        = () => applyDecorators(IsNotEmpty(), ApiProperty(), IsEmail({}, { message: 'Please provide a valid email address.' })); // prettier-ignore
export const IsNotEmptyEnum = (e: any)   => applyDecorators(IsNotEmpty(), ApiProperty({ type: String, enum: e }), IsEnum(e)); // prettier-ignore
export const IsNotEmptyISO8601      = () => applyDecorators(IsNotEmpty(), ApiProperty(), IsISO8601()); // prettier-ignore
export const IsNotEmptyIn   = (e: any[]) => applyDecorators(IsNotEmpty(), ApiProperty({ type: String, enum: e }), IsIn(e)); // prettier-ignore
export const IsNotEmptyNumber       = () => applyDecorators(IsNotEmpty(), ApiProperty(), IsNumber()); // prettier-ignore
// export const IsNotEmptyString       = () => applyDecorators(IsNotEmpty(), ApiProperty(), IsString()); // prettier-ignore
export const IsNotEmptyString       = () => applyDecorators(IsNotEmpty(), ApiProperty(), IsString(), IsNotBlank(), TransformTrimString() as any); // prettier-ignore

// ===========================================
// OTHERS
// ===========================================
export const ApiFileBody = (fieldName: string) =>
  ApiBody({
    schema: { type: 'object', properties: { [fieldName]: { type: 'string', format: 'binary' } } }
  });

export const IsArrayType = <T>(e: new () => T, minSize = 1) =>
  applyDecorators(
    ArrayMinSize(minSize),
    ValidateNested(),
    Type(() => e) as any,
    ApiProperty({ isArray: true, type: e })
  );

// ===========================================
// PHONE NUMBER
// ===========================================
// export const IsNotEmptyPhoneNumber = () =>
//   applyDecorators(
//     // ! NOTE: do not changing any lines in this decorator
//     Transform(x => parsePhoneNumberFromString(x)) as any,
//     IsPhoneNumber(),
//     ApiProperty({ type: String })
//   );

// export const IsOptionalPhoneNumber = () =>
//   applyDecorators(
//     IsOptional(),
//     // ! NOTE: do not changing any lines in this decorator
//     Transform(x => parsePhoneNumberFromString(x)) as any,
//     IsPhoneNumber(),
//     ApiPropertyOptional({ type: String })
//   );
