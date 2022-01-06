import { ApiProperty } from '@nestjs/swagger';

export class QueryParamsDto {
  @ApiProperty()
  skip?: number;
  @ApiProperty()
  limit?: number;
}
