import { getSkip } from '@app/shared/prisma';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateUserReq,
  IUserService,
  LoginReq,
  UserPageReq,
  UserServiceName,
} from 'libs/grpc/proto/user/user';
import { PrismaService } from '../services';

@Controller()
export class UserController implements IUserService {
  constructor(private prismaService: PrismaService) {}
  private readonly logger = new Logger(UserController.name);

  @GrpcMethod(UserServiceName)
  async userPage(request: UserPageReq) {
    this.logger.error(request);
    const list = await this.prismaService.user.findMany({
      skip: getSkip(request.current, request.pageSize),
      take: request.pageSize,
    });
    const total = await this.prismaService.user.count();
    return { list, total };
  }

  @GrpcMethod(UserServiceName)
  async createUser(request: CreateUserReq) {
    const user = await this.prismaService.user.create({
      data: request,
    });
    return user;
  }

  @GrpcMethod(UserServiceName)
  async login(request: LoginReq) {
    return await this.prismaService.user.findFirst({
      where: {
        username: request.username,
        password: request.password,
      },
    });
  }
}
