import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class SocialConfig {
  @IsNotEmpty()
  @IsString()
  SOCIAL_TYPE = '';

  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => (o.SOCIAL_TYPE as string).includes('google'))
  GOOGLE_CLIENT_ID!: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => (o.SOCIAL_TYPE as string).includes('twitter'))
  TWITTER_CONSUMER_KEY!: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => (o.SOCIAL_TYPE as string).includes('twitter'))
  TWITTER_CONSUMER_SECRET!: string;
}
