import { IP } from '@app/shared/constants/services';
import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export function createService(
  name: string,
  module: unknown,
  port = 5000,
): Promise<INestMicroservice> {
  return NestFactory.createMicroservice<MicroserviceOptions>(module, {
    transport: Transport.GRPC,
    options: {
      package: name,
      url: `${IP}:${port}`,
      protoPath: join(__dirname, `../../grpc/proto/${name}/${name}.proto`),
    },
  });
}
