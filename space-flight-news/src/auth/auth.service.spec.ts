import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      exports: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);

    try {
      await usersService.findOne('teste');
    } catch (e) {
      await usersService.create('teste', 'testepass');
    }
  });

  describe('validateUser', () => {
    it('should validate user', async () => {
      const response = await authService.validateUser('teste', 'testepass');
      expect(response.username).toBe('teste');
    });

    it('should invalidate user', async () => {
      const response = await authService.validateUser(
        Date.now().toString(),
        Date.now().toString(),
      );
      expect(response).toBeNull();
    });
  });

  describe('login', () => {
    it('should login', async () => {
      const response = await authService.login({
        username: 'teste',
        password: 'testepass',
      });
      expect(typeof response.access_token).toBe('string');
    });
  });
});
