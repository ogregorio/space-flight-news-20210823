import * as Joi from 'joi';

const CreateArticleSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  imageUrl: Joi.string().uri(),
  newsSite: Joi.string().required(),
  summary: Joi.string().allow(null, ''),
  publishedAt: Joi.string().isoDate().required(),
  updatedAt: Joi.string().isoDate().required(),
  featured: Joi.boolean().required(),
  launches: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      provider: Joi.string(),
    }),
  ),
  events: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      provider: Joi.string(),
    }),
  ),
});

export { CreateArticleSchema };
