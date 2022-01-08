import { ArticleDto } from '../dto/article.dto';
import { CreateArticleSchema } from '../schemas/create-article.schema';

export class CreateArticle extends ArticleDto {
  constructor(article: ArticleDto) {
    super();
    Object.assign(this, article);
  }

  validate(): any {
    return CreateArticleSchema.validate(this);
  }

  isValid(): boolean {
    try {
      return CreateArticleSchema.validate(this).error ? false : true;
    } catch (e) {
      return false;
    }
  }
}
