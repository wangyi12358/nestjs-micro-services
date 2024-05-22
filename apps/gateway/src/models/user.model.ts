import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from './base.model';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  password: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  name: string;
}

@ObjectType()
export class Login {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class UserPagination extends PaginationResponse(User) {}

@ObjectType()
export class UserGrpcRes {
  @Field()
  message: string;
}
