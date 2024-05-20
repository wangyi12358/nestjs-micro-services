import { createService } from '@app/grpc';
import { servicePorts } from '@app/shared/common/services';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await createService('user', UserModule, servicePorts.user);
  await app.listen();
}
bootstrap();
