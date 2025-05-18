import { Module } from '@nestjs/common';
import { EventRepositoryModule } from './repository/event.repository.module';
import { EventController } from './event.controller';
import { EventService } from './service/event.service';

@Module({
  imports: [EventRepositoryModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}