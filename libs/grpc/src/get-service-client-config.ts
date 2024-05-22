import { Transport } from '@nestjs/microservices';
import { join } from 'path';

export function getServiceClientConfig(
  clientName: string,
  name: string,
  url: `${string}:${number}` = 'localhost:5000',
) {
  return {
    name: clientName,
    transport: Transport.GRPC,
    options: {
      package: name,
      url: url as string,
      protoPath: join(__dirname, `../../grpc/proto/${name}/${name}.proto`),
    },
  } as const;
}
