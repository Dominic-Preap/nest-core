import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dialect } from 'sequelize';

export class SequelizeConfig {
  @IsNotEmpty()
  @IsString()
  DB_HOST!: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(x => +x)
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
  DB_CONNECTION!: Dialect;

  @IsNotEmpty()
  @IsBoolean()
  @Transform((x: string) => x.toLowerCase() === 'true')
  DB_LOGGING!: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Transform((x: string) => x.toLowerCase() === 'true')
  DB_SYNC!: boolean;
}
