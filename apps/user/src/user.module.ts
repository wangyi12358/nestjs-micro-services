import { Module } from '@nestjs/common';
import { UserService } from './controllers/user.contoller';
import * as services from './services';

@Module({
  imports: [],
  controllers: [UserService],
  providers: Object.values(services),
})
export class UserModule {}
