import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './service/item.service';
import { ItemRepositoryModule } from './repository/item.repository.module';

@Module({
  imports: [ItemRepositoryModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}