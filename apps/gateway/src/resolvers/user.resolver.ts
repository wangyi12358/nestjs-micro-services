import { Clients } from '@app/shared/constants/services';
import { md5 } from '@app/shared/md5/md5';
import {
  Inject,
  OnModuleInit,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { IUserServiceClient, UserServiceName } from 'libs/grpc/proto/user/user';
import { I18n, I18nContext } from 'nestjs-i18n';
import { lastValueFrom } from 'rxjs';
import { AuthGuard, CurrentUser } from '../guards/auth.guard';
import { PaginationInput } from '../models/base.model';
import { Login, User, UserInput, UserPagination } from '../models/user.model';

@Resolver()
export class UserResolver implements OnModuleInit {
  constructor(
    @Inject(Clients.USER_SERVICE) private client: ClientGrpc,
    private jwtService: JwtService,
  ) {}
  private userService: IUserServiceClient;

  onModuleInit() {
    this.userService =
      this.client.getService<IUserServiceClient>(UserServiceName);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async profile(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => UserPagination)
  @UseGuards(AuthGuard)
  async userPage(@Args('pagination') p: PaginationInput) {
    return await lastValueFrom(this.userService.userPage(p));
  }

  @Mutation(() => Boolean)
  async createUser(
    @Args('user') userInput: UserInput,
    @CurrentUser() user: User,
  ) {
    await lastValueFrom(
      this.userService.createUser({
        ...userInput,
        password: md5(userInput.password),
        createdId: user?.id ?? '',
        updatedId: user?.id ?? '',
      }),
    );
    return true;
  }

  @Mutation(() => Login)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @I18n() i18n: I18nContext,
  ) {
    const user = await lastValueFrom(
      this.userService.login({
        username,
        password: md5(password),
      }),
    );
    if (!user) {
      throw new UnauthorizedException(i18n.t('result-code.user.notFound'));
    }
    const token = await this.jwtService.signAsync(user);
    return { token, user };
  }
}
