import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`, 'trusted-cdn.com'],
        },
      },
      xssFilter: true,
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(`Starter Project with Nest.Js`)
    .setDescription(``)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000, '0.0.0.0');
}
bootstrap();
