import { createService } from '@app/grpc';
import { SERVICE_PORTS, Services } from '@app/shared/constants/services';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await createService(
    Services.user,
    UserModule,
    SERVICE_PORTS.USER,
  );
  await app.listen();
}
bootstrap();
