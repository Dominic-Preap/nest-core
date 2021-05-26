import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TypeOrmConfig {
  @IsNotEmpty()
  @IsString()
  DB_HOST!: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(x => +x.value)
  DB_PORT!: number;

  @IsNotEmpty()
  @IsString()
  DB_SCHEMA!: string;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME!: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD!: string;

  @IsNotEmpty()
  @IsString()
  DB_CONNECTION!: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(x => String(x.value).toLowerCase() === 'true')
  DB_LOGGING!: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(x => String(x.value).toLowerCase() === 'true')
  DB_SYNC!: boolean;
}
