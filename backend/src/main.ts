import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const config = new DocumentBuilder()
    .setTitle('Gestion de Stock')
    .setDescription('API de gestion de stock des produits')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(
    `\n Application démarrée sur http://localhost:${port}\n Documentation Swagger : http://localhost:${port}/api\n`,
  );
}
bootstrap();