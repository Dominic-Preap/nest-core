import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Tile38Config {
  @IsNotEmpty()
  @IsString()
  TILE38_HOST!: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(x => +x.value)
  TILE38_PORT!: number;

  @IsOptional()
  @IsString()
  TILE38_AUTH_PASS!: string;
}
