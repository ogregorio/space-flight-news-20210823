import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log(
    dotenv.config().error ? 'Dotenv file not found' : 'Using dotenv',
    'Environment',
  );

  const config = new DocumentBuilder()
    .setTitle('Space Flight News')
    .setDescription('Back-end Challenge 🏅 2021 - Space Flight News')
    .setVersion('1.0')
    .addTag('flight')
    .setContact(
      'Arthur Gregório',
      'https://github.com/ogregorio/',
      'arthurgregorioleal@mail.com',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
