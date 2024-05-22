/** @format */

// This is code generated automatically by the proto2ts, please do not modify
import { Observable } from 'rxjs';

export interface CreateUserReq {
  name: string;
  username: string;
  password: string;
  createdId: string;
  updatedId: string;
}

export interface UserRes {
  id: string;
  name: string;
  username: string;
  password: string;
  createdId: string;
  updatedId: string;
}

export interface UserPageRes {
  list: UserRes[];
  //  @int32
  total: number;
}

export interface UserPageReq {
  //  @int32
  current: number;
  //  @int32
  pageSize: number;
}

export interface LoginReq {
  username: string;
  password: string;
}

export const UserServiceName = 'UserService';

export interface IUserService {
  userPage: (request: UserPageReq) => Promise<UserPageRes>;
  createUser: (request: CreateUserReq) => Promise<UserRes>;
  login: (request: LoginReq) => Promise<UserRes>;
}

export interface IUserServiceClient {
  userPage: (request: UserPageReq) => Observable<UserPageRes>;
  createUser: (request: CreateUserReq) => Observable<UserRes>;
  login: (request: LoginReq) => Observable<UserRes>;
}
