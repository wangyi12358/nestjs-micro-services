import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserRes } from 'libs/grpc/proto/user/user';

@Controller()
export class UserController {
  @GrpcMethod('UserService', 'GetExample')
  findMany(): UserRes {
    return { message: 'John' };
  }
}
