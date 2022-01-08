import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoClient } from 'src/@drivers/mongo.driver';
import { UserDto } from './dto/user.dto';
import { User } from './entities/create-user.entity';

@Injectable()
export class UsersService {
  async create(username: string, password: string) {
    const exists = await this.findOne(username);
    if (exists) {
      const user: User = new User(username, password);
      const database = await new MongoClient().getDb();
      try {
        return await database.collection('users').insertOne(user);
      } catch (e) {
        throw new InternalServerErrorException('Failed at write to database');
      }
    } else {
      throw new ConflictException('Username already in use');
    }
  }

  async findOne(username: string): Promise<UserDto | undefined> {
    const database = await new MongoClient().getDb();
    const user: UserDto = new UserDto();
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
