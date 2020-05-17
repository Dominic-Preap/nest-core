import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendBirdConfig {
  @IsNotEmpty()
  @IsString()
  SENDBIRD_APP_ID!: string;

  @IsNotEmpty()
  @IsString()
  SENDBIRD_API_TOKEN!: string;

  @IsOptional()
  @IsString()
  SENDBIRD_AUTHORIZATION!: string;
}
