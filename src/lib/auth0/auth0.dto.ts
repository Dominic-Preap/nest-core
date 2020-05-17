import { IsNotEmpty, IsString } from 'class-validator';

export class AuthConfig {
  @IsNotEmpty()
  @IsString()
  AUTH0_DOMAIN!: string;

  @IsNotEmpty()
  @IsString()
  AUTH0_AUDIENCE!: string;

  @IsNotEmpty()
  @IsString()
  AUTH0_CLIENT_ID!: string;

  @IsNotEmpty()
  @IsString()
  AUTH0_CLIENT_SECRET!: string;
}
