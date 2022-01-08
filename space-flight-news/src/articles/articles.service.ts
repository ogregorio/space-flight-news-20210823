import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MongoClient } from 'src/@drivers/mongo.driver';
import { ObjectId } from 'mongodb';
import { ArticleDto } from './dto/article.dto';
import { CreateArticle } from './entities/create-article.entity';
import { UpdateArticle } from './entities/update-article.entity';

@Injectable()
export class ArticlesService {
  async create(article: ArticleDto): Promise<{ insertedId: string }> {
    const database = await new MongoClient().getDb();
    const createArticle: CreateArticle = new CreateArticle(article);
    if (createArticle.isValid()) {
      try {
        return await database.collection('articles').insertOne(createArticle);
      } catch (e) {
        throw new InternalServerErrorException('Failed at write to database');
      }
    }
    throw new BadRequestException(
      createArticle.validate().error.details[0].message,
    );
  }

  async findAll(skip: number, limit = 10): Promise<ArticleDto[]> {
    const database = await new MongoClient().getDb();
    const articles: ArticleDto[] = [];
    try {
      Object.assign(
        articles,
        await database
          .collection('articles')
          .find()
          .skip(Number(skip) || 0)
          .limit(Number(limit) || 100)
          .toArray(),
      );
      if (!!articles) return articles;
      throw new NotFoundException('Articles not found');
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async findOne(id: string): Promise<ArticleDto> {
    const database = await new MongoClient().getDb();
    const article: ArticleDto = new ArticleDto();
    try {
      Object.assign(
        article,
        await database
          .collection('articles')
          .findOne({ _id: new ObjectId(id) }),
      );
      if (!!article) return article;
      throw new NotFoundException('Article not found');
    } catch (e) {
      throw new NotFoundException('The requested article was not found');
    }
  }

  async update(
    id: string,
    article: ArticleDto,
  ): Promise<{ modifiedCount: number }> {
    const database = await new MongoClient().getDb();
    const uDto: UpdateArticle = new UpdateArticle(id, article);
    if (uDto.isValid()) {
      try {
        const filter = { _id: new ObjectId(id) };
        return await database
          .collection('articles')
          .update(filter, { $set: uDto });
      } catch (e) {
        throw new InternalServerErrorException('Failed at write to database');
      }
    }
    throw new BadRequestException(uDto.validate().error.details[0].message);
  }

  async remove(id: string): Promise<{ message: string }> {
    const database = await new MongoClient().getDb();
    try {
      const res = await database
        .collection('articles')
        .deleteOne({ _id: new ObjectId(id) });
      if (res['deletedCount'] === 1) return { message: 'Deleted with success' };
      throw new NotFoundException('article was not found');
    } catch (e) {
      throw new NotFoundException('Unable to delete file', e.message);
    }
  }
}
