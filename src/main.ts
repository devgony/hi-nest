import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // if a property doesn't have validator, it will be striped off(ignored) and insert others
      forbidNonWhitelisted: true, // if a property doesn;t have validator, return error: "property title should not exist"
      transform: true, // convert string of url param to number
    }),
  );
  await app.listen(3000);
}
bootstrap();
