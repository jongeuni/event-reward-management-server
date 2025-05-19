import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './common/custom.exception.filter';
import { initDummy } from './dummy/init-dummy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.PORT ?? 3001);
  await initDummy(app);
}
bootstrap();
