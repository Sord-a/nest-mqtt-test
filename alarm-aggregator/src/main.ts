import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  // for the errors that can not be handled by exception filters
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // Log and/or handle the error
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Log and/or handle the error
  });
}
bootstrap();
