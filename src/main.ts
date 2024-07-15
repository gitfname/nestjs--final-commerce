import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from './app.module';
import { ExpectionsFilter } from './global-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExpectionsFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  await app.listen(33489);
}
bootstrap();
