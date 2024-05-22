import { getSkip } from '@app/shared/prisma';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateUserReq,
  IUserService,
  LoginReq,
  UserPageReq,
} from 'libs/grpc/proto/user/user';
import { PrismaService } from '../services';

@Controller()
export class UserService implements IUserService {
  constructor(private prismaService: PrismaService) {}

  @GrpcMethod()
  async userPage(request: UserPageReq) {
    console.log(request);
    const list = await this.prismaService.user.findMany({
      skip: getSkip(request.current, request.pageSize),
      take: request.pageSize,
    });
    const total = await this.prismaService.user.count();
    return { list, total };
  }

  @GrpcMethod()
  async createUser(request: CreateUserReq) {
    const user = await this.prismaService.user.create({
      data: request,
    });
    return user;
  }

  @GrpcMethod()
  async login(request: LoginReq) {
    return await this.prismaService.user.findFirst({
      where: {
        username: request.username,
        password: request.password,
      },
    });
  }
}
