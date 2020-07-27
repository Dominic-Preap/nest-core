import { IsNotEmpty, IsString } from 'class-validator';

export class AuthConfig {
  @IsNotEmpty()
  @IsString()
  KEYCLOAK_DOMAIN!: string;

  @IsNotEmpty()
  @IsString()
  KEYCLOAK_AUDIENCE!: string;

  @IsNotEmpty()
  @IsString()
  KEYCLOAK_REALM!: string;

  @IsNotEmpty()
  @IsString()
  KEYCLOAK_USERNAME!: string;

  @IsNotEmpty()
  @IsString()
  KEYCLOAK_PASSWORD!: string;
}
