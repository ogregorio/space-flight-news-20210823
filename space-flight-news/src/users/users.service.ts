import { Injectable } from '@nestjs/common';
import { MongoClient } from 'src/@drivers/mongo.driver';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    const database = await MongoClient();
    const user: User = new User();
    try {
      Object.assign(
        user,
        await database.collection('users').findOne({ username: username }),
      );
      return !!user ? user : undefined;
    } catch (err) {
      return undefined;
    }
  }
}
