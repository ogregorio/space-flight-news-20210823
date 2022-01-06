import { Article } from '../dto/article.dto';
import { CreateArticleSchema } from '../schemas/create-article.schema';

export class CreateArticleDto extends Article {
  constructor(cDto: Article) {
    super();
    Object.assign(this, cDto);
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
