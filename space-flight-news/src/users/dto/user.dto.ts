import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  userId?: string;
  @ApiProperty()
  username?: string;
  @ApiProperty()
  password?: string;
}
