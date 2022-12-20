import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

// this interceptor to keep only userId from user while saving tasks
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const nestJsPort = process.env.PORT;
  await app.listen(nestJsPort);
  logger.log(`Application is listening at port ${nestJsPort}`);
}
bootstrap();
