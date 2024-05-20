import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { UserService } from 'libs/grpc/proto/user/user';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard, CurrentUser } from '../guards/auth.guard';
import { PaginationInput } from '../models/base.model';
import {
  Login,
  User,
  UserGrpcRes,
  UserInput,
  UserPagination,
} from '../models/user.model';

@Resolver()
export class UserResolver implements OnModuleInit {
  constructor(@Inject('USER_SERVICE') private client: ClientGrpc) {}
  private userService: UserService;

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async profile(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => UserPagination)
  @UseGuards(AuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async userPage(@Args('pagination') _: PaginationInput) {
    return { items: [], total: 0 };
    // return await this.userService.page(pagination);
  }

  @Query(() => UserGrpcRes)
  async userGrpc() {
    return this.userService.GetExample({ name: '' });
  }

  @Mutation(() => Boolean)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createUser(@Args('user') userInput: UserInput) {
    // const user = await this.userService.create(userInput)
    // return !!user
    return true;
  }

  @Mutation(() => Login)
  async login(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('username') username: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('password') password: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @I18n() i18n: I18nContext,
  ) {
    // const user = await this.userService.login(username, password)
    // if (!user) {
    //   throw new UnauthorizedException(i18n.t('result-code.user.notFound'));
    // }
    // const token = await this.jwtService.signAsync(user);
    // return { token, user };
    return { token: '', user: {} };
  }
}
