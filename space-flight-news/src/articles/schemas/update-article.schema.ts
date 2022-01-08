import * as Joi from 'joi';

const UpdateArticleSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  url: Joi.string().uri(),
  imageUrl: Joi.string().uri(),
  newsSite: Joi.string(),
  summary: Joi.string().allow(null, ''),
  publishedAt: Joi.string().isoDate(),
  updatedAt: Joi.string().isoDate(),
  featured: Joi.boolean(),
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

export { UpdateArticleSchema };
