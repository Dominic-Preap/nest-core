import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Max, Min } from 'class-validator';

import { TransformToNumber } from '../transformers/number.transformer';

export class PaginationDto {
  @ApiPropertyOptional({ default: 10, description: 'Limit query data ' })
  @Min(0)
  @Max(100)
  @Transform(x => x || 1) // Prevented from query limit in mongodb, .limit(0) will return all from db
  @TransformToNumber() // Don't remove, look the comment above
  readonly limit: number = 10;

  @ApiPropertyOptional({ default: 0, description: 'Offset query data ' })
  @Min(0)
  @TransformToNumber()
  readonly offset: number = 0;
}
