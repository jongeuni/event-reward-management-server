import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './common/exception/custom.exception.filter';

async function bootstrap() {
  console.log('Mongo ?');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3002);
  app.useGlobalFilters(new CustomExceptionFilter());
  console.log('Mongo URI:', process.env.MONGO_URI);
}
bootstrap();
