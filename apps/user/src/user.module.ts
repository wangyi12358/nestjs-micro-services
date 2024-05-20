import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.contoller';
import * as services from './services';

@Module({
  imports: [],
  controllers: [UserController],
  providers: Object.values(services),
})
export class UserModule {}
