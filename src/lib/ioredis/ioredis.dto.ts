import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class IORedisConfig {
  @IsNotEmpty()
  @IsString()
  REDIS_HOST!: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(x => +x.value)
  REDIS_PORT!: number;

  @IsNotEmpty()
  @IsString()
  REDIS_AUTH_PASS!: string;
}
