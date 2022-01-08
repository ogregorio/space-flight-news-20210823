import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import * as dotenv from 'dotenv';
import { synchronizeDatabase } from 'src/@tasks/sync.task';
import { Article } from './dto/article.dto';
import { ObjectId } from 'mongodb';

describe('ArticlesService', () => {
  let service: ArticlesService;
  const exampleArticle: Article = {
    id: -1,
    title: 'Great Test',
    url: 'https://example.com',
    imageUrl: 'https://example.com',
    newsSite: 'Great Test News',
    summary: 'This is a great test',
    publishedAt: new Date(Date.now()).toISOString(),
    updatedAt: new Date(Date.now()).toISOString(),
    featured: false,
    launches: [],
    events: [],
  };

  beforeAll(async () => {
    dotenv.config();
    await synchronizeDatabase();
  }, 12000);

  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService],
    }).compile();
    service = module.get<ArticlesService>(ArticlesService);
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const response = await service.findAll(0, 10);
      expect(response.length).toBe(10);
    });
  });

  describe('findOne', () => {
    it('should return one article', async () => {
      const { insertedId } = await service.create(exampleArticle);
      const response = await service.findOne(insertedId);
      expect(response).toMatchObject(exampleArticle);
    });
  });

  describe('create', () => {
    it('should create one article', async () => {
      const { insertedId } = await service.create(exampleArticle);
      expect(insertedId).toBeInstanceOf(ObjectId);
    });
  });

  describe('update', () => {
    it('should update one article', async () => {
      const { insertedId } = await service.create(exampleArticle);
      const response = await service.update(insertedId, {
        title: 'New great title',
      });
      expect(response.modifiedCount).toBe(1);
    });
  });

  describe('remove', () => {
    it('should remove one article', async () => {
      const { insertedId } = await service.create(exampleArticle);
      const response = await service.remove(insertedId);
      expect(response.message).toBe('Deleted with success');
    });
  });
});
