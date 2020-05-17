import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AWSConfig {
  @IsNotEmpty()
  @IsString()
  AWS_ACCESS_KEY_ID!: string;

  @IsNotEmpty()
  @IsString()
  AWS_SECRET_ACCESS_KEY!: string;

  @IsNotEmpty()
  @IsString()
  AWS_REGION!: string;

  @IsNotEmpty()
  @IsString()
  AWS_S3_BUCKET!: string;

  @IsNotEmpty()
  @IsString()
  AWS_S3_PREFIX!: string;

  @IsOptional()
  @IsString()
  AWS_DYNAMODB_PREFIX!: string; // For dynamodb prefix table
}
