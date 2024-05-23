/** @format */

// This is code generated automatically by the proto2ts, please do not modify

import { Observable } from 'rxjs';

export interface CreateDeviceReq {
  name: string;
  username: string;
  password: string;
  createdId: string;
  updatedId: string;
}

export interface DeviceRes {
  id: string;
  name: string;
  username: string;
  password: string;
  createdId: string;
  updatedId: string;
}

export interface DevicePageRes {
  list: DeviceRes[];
  //  @int32
  total: number;
}

export interface DevicePageReq {
  //  @int32
  current: number;
  //  @int32
  pageSize: number;
}

export const DeviceServiceName = 'DeviceService';

export interface IDeviceService {
  devicePage: (request: DevicePageReq) => Promise<DevicePageRes>;
  createDevice: (request: CreateDeviceReq) => Promise<DeviceRes>;
}

export interface IDeviceServiceClient {
  devicePage: (request: DevicePageReq) => Observable<DevicePageRes>;
  createDevice: (request: CreateDeviceReq) => Observable<DeviceRes>;
}
