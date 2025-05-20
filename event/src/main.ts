import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './common/exception/custom.exception.filter';
import { initDummy } from './dummy/init-dummy'; // 위의 로직을 함수로 분리해둔 경우

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3002);
  app.useGlobalFilters(new CustomExceptionFilter());
  await initDummy(app);
}
bootstrap();
