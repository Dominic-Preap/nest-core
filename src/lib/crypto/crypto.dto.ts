import { IsNotEmpty, IsString } from 'class-validator';

export class CryptoConfig {
  @IsNotEmpty()
  @IsString()
  CRYPTO_ENCRYPTION_KEY!: string;
}
