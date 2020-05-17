import { IsNotEmpty, IsString } from 'class-validator';

export class WowzaConfig {
  @IsNotEmpty()
  @IsString()
  WOWZA_API_KEY!: string;

  @IsNotEmpty()
  @IsString()
  WOWZA_ACCESS_KEY!: string;
}
