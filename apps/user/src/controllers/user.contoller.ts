import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  UserReq,
  UserRes,
  UserService,
  UserServiceServiceName,
} from 'libs/grpc/proto/user/user';

@Controller()
export class UserController implements UserService {
  @GrpcMethod(UserServiceServiceName)
  async GetExample(request: UserReq): Promise<UserRes> {
    console.log('request', request);
    return { message: 'John' };
  }
}
