import { useLogger } from '@app/shared/logger/logger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useLogger(app, 'gateway');
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
