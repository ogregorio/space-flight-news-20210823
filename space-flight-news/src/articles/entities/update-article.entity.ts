import { Article } from '../dto/article.dto';
import { UpdateArticleSchema } from '../schemas/update-article.schema';

export class UpdateArticleDto extends Article {
  constructor(_id: string, uDto: Article) {
    super();
    Object.assign(this, uDto);
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
