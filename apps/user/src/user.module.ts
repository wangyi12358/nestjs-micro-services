import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.contoller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
