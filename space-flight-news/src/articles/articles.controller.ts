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
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ArticlesService } from './articles.service';
import { ArticleDto } from './dto/article.dto';
import { QueryParamsDto } from './dto/query-params.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  create(@Body() article: ArticleDto) {
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
  @ApiBearerAuth('JWT-auth')
  update(@Param('id') id: string, @Body() article: ArticleDto) {
    return this.articlesService.update(id, article);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
