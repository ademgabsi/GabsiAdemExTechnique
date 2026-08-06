import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FiltreExceptionHttp } from './commun/filtres/filtre-exception-http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new FiltreExceptionHttp());

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();