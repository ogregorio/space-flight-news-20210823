import { ulid } from 'ulid';
import { SHA3 } from 'sha3';

export class User {
  userId: string;
  username: string;
  password: string;

  constructor(username?: string, password?: string) {
    this.userId = ulid() || null;
    this.username = username || null;
    this.password = new SHA3(512).update(password).digest('hex') || null;
  }
}
