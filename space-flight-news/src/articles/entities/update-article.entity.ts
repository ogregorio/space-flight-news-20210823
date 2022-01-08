import { ArticleDto } from '../dto/article.dto';
import { UpdateArticleSchema } from '../schemas/update-article.schema';

export class UpdateArticle extends ArticleDto {
  constructor(_id: string, article: ArticleDto) {
    super();
    Object.assign(this, article);
  }

  validate(): any {
    return UpdateArticleSchema.validate(this);
  }

  isValid(): boolean {
    try {
      return UpdateArticleSchema.validate(this).error ? false : true;
    } catch (e) {
      return false;
    }
  }
}
