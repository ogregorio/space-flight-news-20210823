import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ArticlesService } from './articles.service';
import { Article } from './dto/article.dto';
import { QueryParamsDto } from './dto/query-params.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() article: Article) {
    return this.articlesService.create(article);
  }

  @Get()
  findAll(@Query() query: QueryParamsDto) {
    return this.articlesService.findAll(query.skip, query.limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() article: Article) {
    return this.articlesService.update(id, article);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
