import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {

  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<string>('PORT');
  app.setGlobalPrefix('api/v1');

  // port
  await app.listen(port, () => logger.log(`App running on Port: ${port}`));
}
bootstrap();
