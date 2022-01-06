import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { synchronizeDatabase } from './@tasks/sync.task';

@Injectable()
export class AppService {
  getHello(): object {
    return { message: 'Back-end Challenge 2021 🏅 - Space Flight News' };
  }

  @Cron('* * 9 * * *')
  getSync() {
    synchronizeDatabase();
  }
}
