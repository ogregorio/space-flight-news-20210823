import { Test, TestingModule } from '@nestjs/testing';
import { sendMail } from './@services/mail.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    dotenv.config();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Back-end Challenge 2021 🏅 - Space Flight News"', () => {
      expect(appController.getHello()['message']).toBe(
        'Back-end Challenge 2021 🏅 - Space Flight News',
      );
    });
  });

  describe('mail service', () => {
    it('should send a email to arthurgregorioleal@gmail.com', async () => {
      expect(await sendMail()).toBe(true);
    });
  });
});
