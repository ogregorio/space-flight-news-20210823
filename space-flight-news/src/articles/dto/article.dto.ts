import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
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
  launches?: Array<{ id: string; provider: string }>;
  @ApiProperty()
  events?: Array<{ id: string; provider: string }>;
}
