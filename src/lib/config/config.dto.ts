import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ConfigDto {
  @IsNotEmpty()
  NODE_ENV!: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(x => +x.value)
  PORT!: number;

  @IsNotEmpty()
  JWT_SECRET!: string;
}
