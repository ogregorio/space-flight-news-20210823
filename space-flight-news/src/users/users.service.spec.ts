import { UserDto } from './dto/user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as dotenv from 'dotenv';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    try {
      service.create('teste', 'testepass');
    } catch (e) {}
  });

  describe('findOne - teste user', () => {
    it('should find one user', async () => {
      const response: UserDto = await service.findOne('teste');
      expect(response.username).toBe('teste');
    });
  });

  describe('findOne - user not found', () => {
    it('should find one user', async () => {
      const response = await service.findOne(Date.now().toString());
      expect(response).toMatchObject({});
    });
  });
});
