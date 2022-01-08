import { ApiProperty } from '@nestjs/swagger';

export class Article {
  _id?: string;
  @ApiProperty()
  id?: number;
  @ApiProperty()
  title?: string;
  @ApiProperty()
  url?: string;
  @ApiProperty()
  imageUrl?: string;
  @ApiProperty()
  newsSite?: string;
  @ApiProperty()
  summary?: string;
  @ApiProperty()
  publishedAt?: string;
  @ApiProperty()
  updatedAt?: string;
  @ApiProperty()
  featured?: boolean;
  @ApiProperty()
  launches?: Array<any>;
  @ApiProperty()
  events?: Array<any>;
}
