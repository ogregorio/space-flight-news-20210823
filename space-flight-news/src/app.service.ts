import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { message: 'Back-end Challenge 2021 🏅 - Space Flight News' };
  }
}
